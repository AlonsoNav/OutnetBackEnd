DROP PROCEDURE IF EXISTS SP_inventory_request;
GO
CREATE PROCEDURE SP_inventory_request
    @id BIGINT,
    @amount SMALLINT
AS
BEGIN
    INSERT INTO Inventory (product_id, amount, date)
    VALUES (@id, @amount, CAST(GETDATE() AS DATETIME));

    UPDATE Product
    SET amount = amount + @amount
    WHERE product_id = @id;
END;
