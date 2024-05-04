DROP PROCEDURE IF EXISTS SP_create_user;
GO
CREATE PROCEDURE SP_create_user
    @name VARCHAR(20),
    @email VARCHAR(300),
    @password VARCHAR(64),
    @telephone VARCHAR(20)
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @message VARCHAR(MAX);
    DECLARE @code INT;
    SET @code = 400;
    SET @email = Ltrim(Rtrim(@email));
    SET @name = Ltrim(Rtrim(@name));
    SET @password = Ltrim(Rtrim(@password));

    IF LEN(@name) = 0
    BEGIN
        SET @message = N'Nombre de usuario vacío.';
        SELECT @code AS code, @message AS message;
        RETURN;
    END

    IF PATINDEX ('%[ &'',":;!+=\/()<>]%', @email) > 0 -- Invalid characters
     OR PATINDEX ('[@.-_]%', @email) > 0 -- Valid but cannot be starting character
     OR PATINDEX ('%[@.-_]', @email) > 0 -- Valid but cannot be ending character
     OR @email NOT LIKE '%@%.%' -- Must contain at least one @ and one .
     OR @email LIKE '%..%' -- Cannot have two periods in a row
     OR @email LIKE '%@%@%' -- Cannot have two @ anywhere
     OR @email LIKE '%.@%' OR @email LIKE '%@.%' -- Cannot have @ and . next to each other
     OR @email LIKE '%.cm' OR @email LIKE '%.co' -- Camaroon or Colombia? Typos.
     OR @email LIKE '%.or' OR @email LIKE '%.ne' -- Missing last letter
    BEGIN
        SET @message = N'Correo electrónico inválido.';
        SELECT @code AS code, @message AS message;
        RETURN;
    END

    IF LEN(@password) < 8
    BEGIN
        SET @message = N'La contraseña debe tener al menos 8 caracteres.';
        SELECT @code AS code, @message AS message;
        RETURN;
    END

    IF LEN(@telephone) <> 8
    BEGIN
        SET @message = N'Número telefónico inválido.';
        SELECT @code AS code, @message AS message;
        RETURN;
    END

    IF EXISTS (SELECT 1 FROM [User] WHERE [email] = @email)
    BEGIN
        SET @message = N'El correo electrónico ya está registrado, por favor inicie sesión.';
        SELECT @code AS code, @message AS message;
        RETURN;
    END

    DECLARE @encryptedPassword VARBINARY(256);
    SET @encryptedPassword = HASHBYTES('SHA2_256', @password);

    INSERT INTO [User] ([name], [email], [password], [telephone], [is_admin])
    VALUES (@name, @email, @encryptedPassword, @telephone, 0);

    SET @message = N'Usuario registrado exitosamente, por favor inicie sesión.'
    SET @code = 200;
    SELECT @code AS code, @message AS message;
END;