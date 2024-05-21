DROP PROCEDURE IF EXISTS SP_create_product;
GO
CREATE PROCEDURE SP_create_product
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
    DECLARE @productId BIGINT;
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

    INSERT INTO Product (name, description, outlet_price, price, discount, amount, category_id, brand_id)
    VALUES (@name, @description, @outlet_price_cast, @price_cast, @outlet_price_cast * 100 / @price_cast / 100, 0, @category_id, @brand_id)

    SET @productId = SCOPE_IDENTITY();

    INSERT INTO PicXProduct (product_id, pic_id)
    SELECT @productId, id FROM @imagesTable;

    SET @message = N'Producto creado exitosamente.'
    SET @code = 200;
    SELECT @code AS code, @message AS message;
END;
