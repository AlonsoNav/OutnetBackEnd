DROP PROCEDURE IF EXISTS SP_get_comments_product;
GO
CREATE PROCEDURE SP_get_comments_product
AS
BEGIN
    SELECT 
        description,
		product_id,
        star_rate,
        u.name,
		u.email
    FROM 
        Comment
    LEFT JOIN 
        [User] u ON Comment.user_id = u.user_id
    ORDER BY 
        Comment.user_id;
END;

exec SP_get_comments_product