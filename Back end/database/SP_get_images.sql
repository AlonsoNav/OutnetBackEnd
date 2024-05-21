DROP PROCEDURE IF EXISTS SP_get_images;
GO
CREATE PROCEDURE SP_get_images
AS
BEGIN
    SELECT p.pic_id, p.description, p.image FROM Pic p;
END;