DROP PROCEDURE IF EXISTS SP_get_categories;
GO
CREATE PROCEDURE SP_get_categories
AS
BEGIN
    SELECT name
    FROM Category
    ORDER BY name;
END;
