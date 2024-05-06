DROP PROCEDURE IF EXISTS SP_upload_image;
GO
CREATE PROCEDURE SP_upload_image
    @description VARCHAR(300),
    @image VARBINARY(MAX)
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @pic_id BIGINT

    INSERT INTO [Pic] ([description], [image])
    VALUES (@description, @image);

    SET @pic_id = SCOPE_IDENTITY();

    SELECT @pic_id AS pic_id;
END;