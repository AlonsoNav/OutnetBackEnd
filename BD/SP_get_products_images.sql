
DROP PROCEDURE IF EXISTS SP_get_products_images;
GO
CREATE PROCEDURE SP_get_products_images
AS
BEGIN
    SELECT p.product_id,p.name, p.description, p.outlet_price, p.price, p.discount, p.amount, b.name AS brand, c.name AS category, pc.image
    FROM Product p
    LEFT JOIN Brand b on p.brand_id = b.brand_id
    LEFT JOIN Category c on p.category_id = c.category_id
	LEFT JOIN PicXProduct pxp on p.product_id = pxp.product_id
	LEFT JOIN Pic pc on pxp.pic_id = pc.pic_id
    ORDER BY p.name;
END;

EXEC SP_get_products_images