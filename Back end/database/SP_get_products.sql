DROP PROCEDURE IF EXISTS SP_get_products;
GO
CREATE PROCEDURE SP_get_products
AS
BEGIN
    SELECT p.product_id, p.name, p.description, CAST(p.outlet_price AS INTEGER) AS outlet_price, CAST(p.price AS INTEGER) AS price, p.discount, p.amount, b.name AS brand, c.name AS category
    FROM Product p
    LEFT JOIN Brand b on p.brand_id = b.brand_id
    LEFT JOIN Category c on p.category_id = c.category_id
    ORDER BY p.name;
END;