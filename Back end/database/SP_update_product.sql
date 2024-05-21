DROP PROCEDURE IF EXISTS SP_update_product;
GO
CREATE PROCEDURE SP_update_product
    @id BIGINT,
    @name VARCHAR(30),
    @description VARCHAR(300),
    @price VARCHAR(12),
    @outlet_price VARCHAR(12),
    @category VARCHAR(50),
    @brand VARCHAR(50),
    @images NVARCHAR(MAX)
AS
BEGIN
    DECLARE @imagesTable TABLE (id BIGINT);
    DECLARE @price_cast MONEY;
    DECLARE @outlet_price_cast MONEY;
    DECLARE @brand_id SMALLINT;
    DECLARE @category_id SMALLINT;
    DECLARE @message VARCHAR(MAX);
    DECLARE @code INT;
    SET @code = 400;

    SET @price_cast = CAST(@price AS MONEY);
    SET @outlet_price_cast = CAST(@outlet_price AS MONEY);

    SELECT @category_id = category_id FROM Category WHERE name = @category;

    IF @brand <> 'Sin asignar'
    BEGIN
        SELECT @brand_id = brand_id FROM Brand WHERE name = @brand;
    END
    ELSE
    BEGIN
        SET @brand_id = NULL;
    END

    INSERT INTO @imagesTable (id)
    SELECT id FROM OPENJSON(@images)
    WITH (id INT '$');

    UPDATE [Product]
    SET name = @name,
        description = @description,
        outlet_price = @outlet_price_cast,
        price = @price_cast,
        discount = @outlet_price_cast * 100 / @price_cast / 100,
        category_id = @category_id,
        brand_id = @brand_id
    WHERE product_id = @id;

    INSERT INTO PicXProduct (product_id, pic_id)
    SELECT @id, id FROM @imagesTable;

    SET @message = N'Producto modificado exitosamente.'
    SET @code = 200;
    SELECT @code AS code, @message AS message;
END;
