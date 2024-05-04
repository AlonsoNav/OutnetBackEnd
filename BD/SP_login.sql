DROP PROCEDURE IF EXISTS SP_login;
GO
CREATE PROCEDURE SP_login
    @email VARCHAR(300),
    @password VARCHAR(64)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @encryptedPassword VARBINARY(256);
    DECLARE @message VARCHAR(MAX);
    DECLARE @name VARCHAR(20);
    DECLARE @telephone VARCHAR(20);
    DECLARE @is_admin BIT;
    DECLARE @address VARCHAR(300);
    DECLARE @postal_code VARCHAR(20);
    DECLARE @code INT;
    SET @encryptedPassword = HASHBYTES('SHA2_256', @password);
    SELECT @name = name,
           @telephone = telephone,
           @is_admin = is_admin,
           @address = address,
           @postal_code = postal_code
    FROM [User]
    WHERE UPPER(email) = UPPER(@email) AND password = @encryptedPassword;

    IF @name IS NOT NULL
    BEGIN
        SET @code = 200;
        SELECT @code AS code, @name AS name, @email AS email,
               @telephone AS phone, @is_admin AS is_admin, @address AS address,
               @postal_code AS postal_code;
    END
    ELSE
    BEGIN
        SET @code = 400;
        SET @message = N'Inicio de sesión fallido: Usuario no encontrado o contraseña incorrecta';
        SELECT @code AS code, @message AS message;
    END
END
