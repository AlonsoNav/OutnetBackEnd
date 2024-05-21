DROP PROCEDURE IF EXISTS SP_get_product_images;
GO
CREATE PROCEDURE SP_get_product_images
    @id BIGINT
AS
BEGIN
    SELECT P.pic_id, P.description, P.image FROM PicXProduct pxp
    INNER JOIN dbo.Pic P on P.pic_id = pxp.pic_id
    WHERE pxp.product_id = @id;
END;