DROP PROCEDURE IF EXISTS SP_upload_image;
GO
CREATE PROCEDURE SP_upload_image
    @description VARCHAR(300),
    @image VARBINARY(MAX)
AS
BEGIN
    INSERT INTO [Pic] ([description], [image])
    VALUES (@description, @image);
END;