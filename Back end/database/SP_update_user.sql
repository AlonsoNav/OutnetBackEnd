DROP PROCEDURE IF EXISTS SP_update_user;
GO
CREATE PROCEDURE SP_update_user
    @email VARCHAR(300),
    @name VARCHAR(20),
    @new_email VARCHAR(300),
    @telephone VARCHAR(20),
    @address VARCHAR(300) = NULL,
    @postal_code VARCHAR(20) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @message VARCHAR(MAX);
    DECLARE @code INT;
    SET @code = 400;
    SET @new_email = Ltrim(Rtrim(@new_email));
    SET @name = Ltrim(Rtrim(@name));

    IF @address IS NOT NULL
    BEGIN
        SET @address = Ltrim(Rtrim(@address));
    END

    IF @postal_code IS NOT NULL
    BEGIN
        SET @postal_code = Ltrim(Rtrim(@postal_code));
    END

    IF LEN(@name) = 0
    BEGIN
        SET @message = N'Nombre de usuario vacío.';
        SELECT @code AS code, @message AS message;
        RETURN;
    END

    IF LOWER(@email) <> LOWER(@new_email)
    BEGIN
        IF PATINDEX ('%[ &'',":;!+=\/()<>]%', @new_email) > 0 -- Invalid characters
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

        IF EXISTS (SELECT 1 FROM [User] WHERE LOWER([email]) = LOWER(@new_email))
        BEGIN
            SET @message = N'El correo electrónico ya está registrado.';
            SELECT @code AS code, @message AS message;
            RETURN;
        END
    END

    IF LEN(@telephone) <> 8
    BEGIN
        SET @message = N'Número telefónico inválido.';
        SELECT @code AS code, @message AS message;
        RETURN;
    END

    UPDATE [User]
    SET name = @name,
        email = @new_email,
        telephone = @telephone,
        address = @address,
        postal_code = @postal_code
    WHERE LOWER([email]) = LOWER(@email);

    SET @message = N'Usuario modificado exitosamente, por favor inicie sesión.'
    SET @code = 200;
    SELECT @code AS code, @message AS message;
END;