DROP PROCEDURE IF EXISTS SP_create_comment;
GO
CREATE PROCEDURE SP_create_comment
	@comment VARCHAR(300),
	@email VARCHAR(300),
    @rating INT,
	@Pid BIGINT
AS
BEGIN
	DECLARE @commentId BIGINT
    DECLARE @userId BIGINT;
    DECLARE @message VARCHAR(MAX);
    DECLARE @code INT;
    SET @code = 400;



    SELECT @userId = user_id FROM [User] WHERE email = @email;

    INSERT INTO Comment (description, date, star_rate, product_id, user_id)
    VALUES (@comment,GETDATE(), @rating, @Pid, @userId)

    SET @commentId = SCOPE_IDENTITY();

    INSERT INTO CommentXUser(comment_id, user_id)
    VALUES (@commentId,@userId)

    SET @message = N'Venta creada exitosamente.'
    SET @code = 200;
    SELECT @code AS code, @message AS message;
END;

select * from Comment