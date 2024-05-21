DROP PROCEDURE IF EXISTS SP_get_sales;
GO
CREATE PROCEDURE SP_get_sales
AS
BEGIN
    SELECT 
		c.cart_id,
        c.subtotal,
		pc.product_id,
		p.name as pName,
		u.name as userName,
		u.email,
		pc.quantity,
		pic.image
    FROM 
        Cart c
    LEFT JOIN 
       ProductXCart pc ON c.cart_id = pc.cart_id
	LEFT JOIN 
		Product p ON p.product_id = pc.product_id
	Left Join
		[User] u on u.user_id = c.user_id
	LEFT JOIN 
    (SELECT 
        pxp.product_id, 
        pc.image, 
        ROW_NUMBER() OVER (PARTITION BY pxp.product_id ORDER BY pxp.pic_id) AS row_num
        FROM 
        PicXProduct pxp
        LEFT JOIN 
        Pic pc ON pxp.pic_id = pc.pic_id
    ) pic ON p.product_id = pic.product_id AND pic.row_num = 1
    ORDER BY 
        c.cart_id;
END;
