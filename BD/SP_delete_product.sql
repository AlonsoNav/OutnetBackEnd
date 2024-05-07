DROP PROCEDURE IF EXISTS SP_delete_product;
GO
CREATE PROCEDURE SP_delete_product
    @id BIGINT
AS
BEGIN
    SET NOCOUNT ON;
    DELETE FROM PicXProduct WHERE product_id = @id;
    DELETE FROM Pic WHERE pic_id NOT IN (SELECT pic_id FROM PicXProduct);
    DELETE FROM Product WHERE product_id = @id;
END;