
DROP PROCEDURE IF EXISTS SP_create_sale;
GO
CREATE PROCEDURE SP_create_sale
	@subtotal VARCHAR(30),
	@email VARCHAR(20),
    @shipping_cost VARCHAR(20),
    @total VARCHAR(7),
    @carts NVARCHAR(MAX)
AS
BEGIN
    DECLARE @productTable TABLE (id BIGINT,quantity bigint);
	DECLARE @userId BIGINT
    DECLARE @cartId BIGINT;
    DECLARE @subtotal_cast MONEY;
	DECLARE @shipping_cast MONEY;
    DECLARE @total_cast MONEY;
    DECLARE @message VARCHAR(MAX);
    DECLARE @code INT;
    SET @code = 400;


    SET @total_cast = CAST(@total AS MONEY);
    SET @subtotal_cast = CAST(@subtotal AS MONEY);
	SET @shipping_cast = CAST(@shipping_cost AS MONEY);


    SELECT @userId = user_id FROM [User] WHERE email = @email;

    INSERT INTO @productTable (id,quantity)
    SELECT id,quantity FROM OPENJSON(@carts)
    WITH (id BIGINT '$',
        quantity BIGINT '$');

    select * from @productTable

    --INSERT INTO Cart (user_id, subtotal, shipping_cost, total, billed, billing_date, state, branch_id)
    --VALUES (@userId, @subtotal_cast, @shipping_cast, @total_cast, 1, GETDATE(), 1, NULL)

    --SET @cartId = SCOPE_IDENTITY();

    --INSERT INTO ProductXCart(cart_id, product_id,quantity,subtotal)
    --SELECT @cartId, id,quantity,@subtotal FROM @productTable;

	--UPDATE Product
    --SET amount = amount - P.quantity
    --FROM Product
    --INNER JOIN @productTable AS P ON Product.product_id = P.id;

    --SET @message = N'Venta creada exitosamente.'
    --SET @code = 200;
    --SELECT @code AS code, @message AS message;
END;

select * from Outnet.dbo.Cart

