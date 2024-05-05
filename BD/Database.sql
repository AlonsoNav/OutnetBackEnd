create database Outnet collate SQL_Latin1_General_CP1_CI_AS
go

grant connect on database :: Outnet to dbo
go

grant view any column encryption key definition, view any column master key definition on database :: Outnet to [public]
go

create table dbo.Admin
(
    admin_id  int           not null
        constraint PK_Admin
            primary key,
    email     varchar(300)  not null,
    password  varbinary(64) not null,
    telephone varchar(20)   not null
)
go

create table dbo.Brand
(
    brand_id smallint identity
        constraint PK_Brand
            primary key,
    name     varchar(50) not null
)
go

create table dbo.Category
(
    category_id     smallint identity
        constraint PK_Category
            primary key,
    name            varchar(50) not null,
    parent_category smallint
        constraint FK_Category_Category
            references dbo.Category
)
go

create table dbo.Country
(
    country_id smallint    not null
        constraint PK_Country
            primary key,
    name       varchar(50) not null
)
go

create table dbo.InventoryState
(
    inventory_state_id tinyint     not null
        constraint PK_InventoryState
            primary key,
    description        varchar(50) not null
)
go

create table dbo.Pic
(
    pic_id      bigint          not null
        constraint PK_Pic
            primary key,
    name        varchar(100)    not null,
    path        varchar(300)    not null,
    description varchar(300)    not null,
    image       varbinary(8000) not null
)
go

create table dbo.ProductState
(
    product_state_id tinyint     not null
        constraint PK_ProductState
            primary key,
    name             varchar(30) not null
)
go

create table dbo.Product
(
    product_id   bigint identity
        constraint PK_Product
            primary key,
    name         varchar(30)  not null,
    description  varchar(300) not null,
    outlet_price money        not null,
    price        money        not null,
    discount     float        not null,
    amount       smallint     not null,
    category_id  smallint     not null
        constraint FK_Product_Category
            references dbo.Category,
    state_id     tinyint
        constraint FK_Product_ProductState
            references dbo.ProductState,
    brand_id     smallint
        constraint FK_Product_Brand
            references dbo.Brand
)
go

create table dbo.Auction
(
    auction_id  bigint   not null
        constraint PK_Auction
            primary key,
    product_id  bigint   not null
        constraint FK_Auction_Product
            references dbo.Product,
    start_date  datetime not null,
    end_date    datetime not null,
    minimum_bid money    not null,
    active      bit      not null
)
go

create table dbo.PicXProduct
(
    pic_id     bigint not null
        constraint FK_PicXProduct_Pic
            references dbo.Pic,
    product_id bigint not null
        constraint FK_PicXProduct_Product
            references dbo.Product
)
go

create table dbo.QA
(
    qa_id    int          not null
        constraint PK_QA
            primary key,
    question varchar(100) not null,
    answer   varchar(300) not null
)
go

create table dbo.State
(
    state_id   bigint      not null
        constraint PK_State
            primary key,
    name       varchar(50) not null,
    country_id smallint    not null
        constraint FK_State_Country
            references dbo.Country
)
go

create table dbo.City
(
    city_id  bigint      not null
        constraint PK_City
            primary key,
    name     varchar(50) not null,
    state_id bigint      not null
        constraint FK_City_State
            references dbo.State
)
go

create table dbo.Address
(
    address_id  bigint      not null
        constraint PK_Address
            primary key,
    postal_code varchar(20) not null,
    description varchar(50) not null,
    gps         geography,
    city_id     bigint
        constraint FK_Address_City
            references dbo.City
)
go

create table dbo.Branch
(
    branch_id    smallint not null
        constraint PK_Branch
            primary key,
    address_id   bigint   not null
        constraint FK_Branch_Address
            references dbo.Address,
    inventory_id smallint not null
)
go

create table dbo.BranchXAdmin
(
    admin_id  int      not null
        constraint FK_BranchXAdmin_Admin
            references dbo.Admin,
    branch_id smallint not null
        constraint FK_BranchXAdmin_Branch
            references dbo.Branch
)
go

create table dbo.Supplier
(
    supplier_id smallint      not null
        constraint PK_Supplier
            primary key,
    email       varchar(300)  not null,
    password    varbinary(64) not null,
    telephone   varbinary(20) not null
)
go

create table dbo.ProductEntryRequest
(
    entry_request_id bigint   not null
        constraint PK_ProductEntryRequest
            primary key,
    supplier_id      smallint not null
        constraint FK_ProductEntryRequest_Supplier
            references dbo.Supplier,
    product_id       bigint   not null
        constraint FK_ProductEntryRequest_Product
            references dbo.Product,
    amount           smallint not null,
    price            money    not null
)
go

create table dbo.Inventory
(
    branch_id          smallint       not null
        constraint FK_Inventory_Branch
            references dbo.Branch,
    admin_id           int            not null
        constraint FK_Inventory_Admin
            references dbo.Admin,
    product_id         bigint         not null
        constraint FK_Inventory_Product
            references dbo.Product,
    inventory_state_id tinyint        not null
        constraint FK_Inventory_InventoryState
            references dbo.InventoryState,
    date               datetime       not null,
    amount             smallint       not null,
    checksum           varbinary(256) not null,
    timestamp                         not null,
    entry_request_id   bigint
        constraint FK_Inventory_ProductEntryRequest
            references dbo.ProductEntryRequest
)
go

create table dbo.Wishlist
(
    wishlist_id   bigint not null
        constraint PK_Wishlist
            primary key,
    product_count bigint not null
)
go

create table dbo.ProductXWishlist
(
    wishlist_id bigint not null
        constraint FK_ProductXWishlist_Wishlist
            references dbo.Wishlist,
    product_id  bigint not null
        constraint FK_ProductXWishlist_Product
            references dbo.Product,
    available   bit    not null
)
go

create table dbo.[User]
(
    user_id     bigint identity
        constraint PK_User
            primary key,
    name        varchar(20)    not null,
    email       varchar(300)   not null,
    password    varbinary(256) not null,
    telephone   varchar(20)    not null,
    wishlist_id bigint
        constraint FK_User_Wishlist
            references dbo.Wishlist,
    is_admin    bit            not null,
    address     varchar(300),
    postal_code varchar(20)
)
go

create table dbo.Bid
(
    auction_id bigint         not null
        constraint FK_Bid_Auction
            references dbo.Auction,
    user_id    bigint         not null
        constraint FK_Bid_User
            references dbo.[User],
    bid        money          not null,
    date       datetime       not null,
    checksum   varbinary(256) not null,
    timestamp                 not null
)
go

create table dbo.Cart
(
    cart_id       bigint      not null
        constraint PK_Cart
            primary key,
    user_id       bigint      not null
        constraint FK_Cart_User
            references dbo.[User],
    subtotal      bigint      not null,
    shipping_cost int         not null,
    total         bigint      not null,
    billed        bit         not null,
    billing_date  datetime,
    state         varchar(50) not null,
    branch_id     smallint
        constraint FK_Cart_Branch
            references dbo.Branch
)
go

create table dbo.CategoryXUser
(
    category_id smallint not null
        constraint FK_CategoryXUser_Category
            references dbo.Category,
    user_id     bigint   not null
        constraint FK_CategoryXUser_User
            references dbo.[User]
)
go

create table dbo.Comment
(
    comment_id  bigint       not null
        constraint PK_Comment
            primary key,
    description varchar(300) not null,
    date        datetime     not null,
    star_rate   tinyint      not null,
    product_id  bigint       not null
        constraint FK_Comment_Product
            references dbo.Product,
    user_id     bigint       not null
        constraint FK_Comment_User
            references dbo.[User]
)
go

create table dbo.CommentXUser
(
    comment_id bigint not null,
    user_id    bigint not null
        constraint FK_CommentXUser_User
            references dbo.[User]
)
go

create table dbo.ProductXCart
(
    cart_id    bigint   not null
        constraint FK_ProductXCart_Cart
            references dbo.Cart,
    product_id bigint   not null
        constraint FK_ProductXCart_Product
            references dbo.Product,
    quantity   smallint not null,
    subtotal   bigint   not null
)
go

CREATE PROCEDURE SP_create_user
    @name VARCHAR(20),
    @email VARCHAR(300),
    @password VARCHAR(64),
    @telephone VARCHAR(20)
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @message VARCHAR(MAX);
    DECLARE @code INT;
    SET @code = 400;
    SET @email = Ltrim(Rtrim(@email));
    SET @name = Ltrim(Rtrim(@name));
    SET @password = Ltrim(Rtrim(@password));

    IF LEN(@name) = 0
    BEGIN
        SET @message = N'Nombre de usuario vacío.';
        SELECT @code AS code, @message AS message;
        RETURN;
    END

    IF PATINDEX ('%[ &'',":;!+=\/()<>]%', @email) > 0 -- Invalid characters
     OR PATINDEX ('[@.-_]%', @email) > 0 -- Valid but cannot be starting character
     OR PATINDEX ('%[@.-_]', @email) > 0 -- Valid but cannot be ending character
     OR @email NOT LIKE '%@%.%' -- Must contain at least one @ and one .
     OR @email LIKE '%..%' -- Cannot have two periods in a row
     OR @email LIKE '%@%@%' -- Cannot have two @ anywhere
     OR @email LIKE '%.@%' OR @email LIKE '%@.%' -- Cannot have @ and . next to each other
     OR @email LIKE '%.cm' OR @email LIKE '%.co' -- Camaroon or Colombia? Typos.
     OR @email LIKE '%.or' OR @email LIKE '%.ne' -- Missing last letter
    BEGIN
        SET @message = N'Correo electrónico inválido.';
        SELECT @code AS code, @message AS message;
        RETURN;
    END

    IF LEN(@password) < 8
    BEGIN
        SET @message = N'La contraseña debe tener al menos 8 caracteres.';
        SELECT @code AS code, @message AS message;
        RETURN;
    END

    IF LEN(@telephone) <> 8
    BEGIN
        SET @message = N'Número telefónico inválido.';
        SELECT @code AS code, @message AS message;
        RETURN;
    END

    IF EXISTS (SELECT 1 FROM [User] WHERE [email] = @email)
    BEGIN
        SET @message = N'El correo electrónico ya está registrado, por favor inicie sesión.';
        SELECT @code AS code, @message AS message;
        RETURN;
    END

    DECLARE @encryptedPassword VARBINARY(256);
    SET @encryptedPassword = HASHBYTES('SHA2_256', @password);

    INSERT INTO [User] ([name], [email], [password], [telephone], [is_admin])
    VALUES (@name, @email, @encryptedPassword, @telephone, 0);

    SET @message = N'Usuario registrado exitosamente, por favor inicie sesión.'
    SET @code = 200;
    SELECT @code AS code, @message AS message;
END;
go

CREATE PROCEDURE SP_get_brands
AS
BEGIN
    SELECT name
    FROM Brand
    ORDER BY name;
END;
go

CREATE PROCEDURE SP_get_categories
AS
BEGIN
    SELECT name
    FROM Category
    ORDER BY name;
END;
go

CREATE PROCEDURE SP_get_products
AS
BEGIN
    SELECT p.name, p.description, p.outlet_price, p.price, p.discount, p.amount, b.name AS brand, c.name AS category
    FROM Product p
    LEFT JOIN Brand b on p.brand_id = b.brand_id
    LEFT JOIN Category c on p.category_id = c.category_id
    ORDER BY p.name;
END;
go

CREATE PROCEDURE SP_login
    @email VARCHAR(300),
    @password VARCHAR(64)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @encryptedPassword VARBINARY(256);
    DECLARE @message VARCHAR(MAX);
    DECLARE @name VARCHAR(20);
    DECLARE @telephone VARCHAR(20);
    DECLARE @is_admin BIT;
    DECLARE @address VARCHAR(300);
    DECLARE @postal_code VARCHAR(20);
    DECLARE @code INT;
    SET @encryptedPassword = HASHBYTES('SHA2_256', @password);
    SELECT @name = name,
           @telephone = telephone,
           @is_admin = is_admin,
           @address = address,
           @postal_code = postal_code
    FROM [User]
    WHERE UPPER(email) = UPPER(@email) AND password = @encryptedPassword;

    IF @name IS NOT NULL
    BEGIN
        SET @code = 200;
        SELECT @code AS code, @name AS name, @email AS email,
               @telephone AS phone, @is_admin AS is_admin, @address AS address,
               @postal_code AS postal_code;
    END
    ELSE
    BEGIN
        SET @code = 400;
        SET @message = N'Inicio de sesión fallido: Usuario no encontrado o contraseña incorrecta';
        SELECT @code AS code, @message AS message;
    END
END
go

CREATE PROCEDURE SP_update_user
    @email VARCHAR(300),
    @name VARCHAR(20),
    @new_email VARCHAR(300),
    @telephone VARCHAR(20),
    @address VARCHAR(300) = NULL,
    @postal_code VARCHAR(20) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @message VARCHAR(MAX);
    DECLARE @code INT;
    SET @code = 400;
    SET @new_email = Ltrim(Rtrim(@new_email));
    SET @name = Ltrim(Rtrim(@name));

    IF @address IS NOT NULL
    BEGIN
        SET @address = Ltrim(Rtrim(@address));
    END

    IF @postal_code IS NOT NULL
    BEGIN
        SET @postal_code = Ltrim(Rtrim(@postal_code));
    END

    IF LEN(@name) = 0
    BEGIN
        SET @message = N'Nombre de usuario vacío.';
        SELECT @code AS code, @message AS message;
        RETURN;
    END

    IF LOWER(@email) <> LOWER(@new_email)
    BEGIN
        IF PATINDEX ('%[ &'',":;!+=\/()<>]%', @new_email) > 0 -- Invalid characters
         OR PATINDEX ('[@.-_]%', @email) > 0 -- Valid but cannot be starting character
         OR PATINDEX ('%[@.-_]', @email) > 0 -- Valid but cannot be ending character
         OR @email NOT LIKE '%@%.%' -- Must contain at least one @ and one .
         OR @email LIKE '%..%' -- Cannot have two periods in a row
         OR @email LIKE '%@%@%' -- Cannot have two @ anywhere
         OR @email LIKE '%.@%' OR @email LIKE '%@.%' -- Cannot have @ and . next to each other
         OR @email LIKE '%.cm' OR @email LIKE '%.co' -- Camaroon or Colombia? Typos.
         OR @email LIKE '%.or' OR @email LIKE '%.ne' -- Missing last letter
        BEGIN
            SET @message = N'Correo electrónico inválido.';
            SELECT @code AS code, @message AS message;
            RETURN;
        END

        IF EXISTS (SELECT 1 FROM [User] WHERE LOWER([email]) = LOWER(@new_email))
        BEGIN
            SET @message = N'El correo electrónico ya está registrado.';
            SELECT @code AS code, @message AS message;
            RETURN;
        END
    END

    IF LEN(@telephone) <> 8
    BEGIN
        SET @message = N'Número telefónico inválido.';
        SELECT @code AS code, @message AS message;
        RETURN;
    END

    UPDATE [User]
    SET name = @name,
        email = @new_email,
        telephone = @telephone,
        address = @address,
        postal_code = @postal_code
    WHERE LOWER([email]) = LOWER(@email);

    SET @message = N'Usuario modificado exitosamente, por favor inicie sesión.'
    SET @code = 200;
    SELECT @code AS code, @message AS message;
END;
go

