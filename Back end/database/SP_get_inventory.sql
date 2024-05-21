DROP PROCEDURE IF EXISTS SP_get_inventory;
GO
CREATE PROCEDURE SP_get_inventory
AS
BEGIN
    SELECT I.amount, I.date, P.outlet_price, P.name, C.name AS category FROM Inventory I
    INNER JOIN Product P on I.product_id = P.product_id
    LEFT JOIN Category C on P.category_id = C.category_id;
END;