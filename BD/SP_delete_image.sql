DROP PROCEDURE IF EXISTS SP_delete_image;
GO
CREATE PROCEDURE SP_delete_image
    @id BIGINT
AS
BEGIN
    SET NOCOUNT ON;
    DELETE FROM Pic WHERE pic_id = @id;
    DELETE FROM PicXProduct Where pic_id = @id;
END;