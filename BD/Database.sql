USE [Outnet]
GO
/****** Object:  Table [dbo].[Address]    Script Date: 4/5/2024 23:28:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Address](
	[address_id] [bigint] NOT NULL,
	[postal_code] [varchar](20) NOT NULL,
	[description] [varchar](50) NOT NULL,
	[gps] [geography] NULL,
	[city_id] [bigint] NULL,
 CONSTRAINT [PK_Address] PRIMARY KEY CLUSTERED 
(
	[address_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Admin]    Script Date: 4/5/2024 23:28:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Admin](
	[admin_id] [int] NOT NULL,
	[email] [varchar](300) NOT NULL,
	[password] [varbinary](64) NOT NULL,
	[telephone] [varchar](20) NOT NULL,
 CONSTRAINT [PK_Admin] PRIMARY KEY CLUSTERED 
(
	[admin_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Auction]    Script Date: 4/5/2024 23:28:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Auction](
	[auction_id] [bigint] NOT NULL,
	[product_id] [bigint] NOT NULL,
	[start_date] [datetime] NOT NULL,
	[end_date] [datetime] NOT NULL,
	[minimum_bid] [money] NOT NULL,
	[active] [bit] NOT NULL,
 CONSTRAINT [PK_Auction] PRIMARY KEY CLUSTERED 
(
	[auction_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Bid]    Script Date: 4/5/2024 23:28:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Bid](
	[auction_id] [bigint] NOT NULL,
	[user_id] [bigint] NOT NULL,
	[bid] [money] NOT NULL,
	[date] [datetime] NOT NULL,
	[checksum] [varbinary](256) NOT NULL,
	[timestamp] [timestamp] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Branch]    Script Date: 4/5/2024 23:28:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Branch](
	[branch_id] [smallint] NOT NULL,
	[address_id] [bigint] NOT NULL,
	[inventory_id] [smallint] NOT NULL,
 CONSTRAINT [PK_Branch] PRIMARY KEY CLUSTERED 
(
	[branch_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[BranchXAdmin]    Script Date: 4/5/2024 23:28:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BranchXAdmin](
	[admin_id] [int] NOT NULL,
	[branch_id] [smallint] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Brand]    Script Date: 4/5/2024 23:28:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Brand](
	[brand_id] [smallint] IDENTITY(1,1) NOT NULL,
	[name] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Brand] PRIMARY KEY CLUSTERED 
(
	[brand_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Cart]    Script Date: 4/5/2024 23:28:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cart](
	[cart_id] [bigint] NOT NULL,
	[user_id] [bigint] NOT NULL,
	[subtotal] [bigint] NOT NULL,
	[shipping_cost] [int] NOT NULL,
	[total] [bigint] NOT NULL,
	[billed] [bit] NOT NULL,
	[billing_date] [datetime] NULL,
	[state] [varchar](50) NOT NULL,
	[branch_id] [smallint] NULL,
 CONSTRAINT [PK_Cart] PRIMARY KEY CLUSTERED 
(
	[cart_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Category]    Script Date: 4/5/2024 23:28:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Category](
	[category_id] [smallint] IDENTITY(1,1) NOT NULL,
	[name] [varchar](50) NOT NULL,
	[parent_category] [smallint] NULL,
 CONSTRAINT [PK_Category] PRIMARY KEY CLUSTERED 
(
	[category_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CategoryXUser]    Script Date: 4/5/2024 23:28:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CategoryXUser](
	[category_id] [smallint] NOT NULL,
	[user_id] [bigint] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[City]    Script Date: 4/5/2024 23:28:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[City](
	[city_id] [bigint] NOT NULL,
	[name] [varchar](50) NOT NULL,
	[state_id] [bigint] NOT NULL,
 CONSTRAINT [PK_City] PRIMARY KEY CLUSTERED 
(
	[city_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Comment]    Script Date: 4/5/2024 23:28:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Comment](
	[comment_id] [bigint] NOT NULL,
	[description] [varchar](300) NOT NULL,
	[date] [datetime] NOT NULL,
	[star_rate] [tinyint] NOT NULL,
	[product_id] [bigint] NOT NULL,
	[user_id] [bigint] NOT NULL,
 CONSTRAINT [PK_Comment] PRIMARY KEY CLUSTERED 
(
	[comment_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CommentXUser]    Script Date: 4/5/2024 23:28:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CommentXUser](
	[comment_id] [bigint] NOT NULL,
	[user_id] [bigint] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Country]    Script Date: 4/5/2024 23:28:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Country](
	[country_id] [smallint] NOT NULL,
	[name] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Country] PRIMARY KEY CLUSTERED 
(
	[country_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Inventory]    Script Date: 4/5/2024 23:28:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Inventory](
	[branch_id] [smallint] NOT NULL,
	[admin_id] [int] NOT NULL,
	[product_id] [bigint] NOT NULL,
	[inventory_state_id] [tinyint] NOT NULL,
	[date] [datetime] NOT NULL,
	[amount] [smallint] NOT NULL,
	[checksum] [varbinary](256) NOT NULL,
	[timestamp] [timestamp] NOT NULL,
	[entry_request_id] [bigint] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[InventoryState]    Script Date: 4/5/2024 23:28:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[InventoryState](
	[inventory_state_id] [tinyint] NOT NULL,
	[description] [varchar](50) NOT NULL,
 CONSTRAINT [PK_InventoryState] PRIMARY KEY CLUSTERED 
(
	[inventory_state_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Pic]    Script Date: 4/5/2024 23:28:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Pic](
	[pic_id] [bigint] NOT NULL,
	[name] [varchar](100) NOT NULL,
	[path] [varchar](300) NOT NULL,
	[description] [varchar](300) NOT NULL,
	[image] [varbinary](8000) NOT NULL,
 CONSTRAINT [PK_Pic] PRIMARY KEY CLUSTERED 
(
	[pic_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PicXProduct]    Script Date: 4/5/2024 23:28:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PicXProduct](
	[pic_id] [bigint] NOT NULL,
	[product_id] [bigint] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Product]    Script Date: 4/5/2024 23:28:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Product](
	[product_id] [bigint] IDENTITY(1,1) NOT NULL,
	[name] [varchar](30) NOT NULL,
	[description] [varchar](300) NOT NULL,
	[outlet_price] [money] NOT NULL,
	[price] [money] NOT NULL,
	[discount] [float] NOT NULL,
	[amount] [smallint] NOT NULL,
	[category_id] [smallint] NOT NULL,
	[state_id] [tinyint] NULL,
	[brand_id] [smallint] NULL,
 CONSTRAINT [PK_Product] PRIMARY KEY CLUSTERED 
(
	[product_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProductEntryRequest]    Script Date: 4/5/2024 23:28:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProductEntryRequest](
	[entry_request_id] [bigint] NOT NULL,
	[supplier_id] [smallint] NOT NULL,
	[product_id] [bigint] NOT NULL,
	[amount] [smallint] NOT NULL,
	[price] [money] NOT NULL,
 CONSTRAINT [PK_ProductEntryRequest] PRIMARY KEY CLUSTERED 
(
	[entry_request_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProductState]    Script Date: 4/5/2024 23:28:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProductState](
	[product_state_id] [tinyint] NOT NULL,
	[name] [varchar](30) NOT NULL,
 CONSTRAINT [PK_ProductState] PRIMARY KEY CLUSTERED 
(
	[product_state_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProductXCart]    Script Date: 4/5/2024 23:28:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProductXCart](
	[cart_id] [bigint] NOT NULL,
	[product_id] [bigint] NOT NULL,
	[quantity] [smallint] NOT NULL,
	[subtotal] [bigint] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProductXWishlist]    Script Date: 4/5/2024 23:28:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProductXWishlist](
	[wishlist_id] [bigint] NOT NULL,
	[product_id] [bigint] NOT NULL,
	[available] [bit] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[QA]    Script Date: 4/5/2024 23:28:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[QA](
	[qa_id] [int] NOT NULL,
	[question] [varchar](100) NOT NULL,
	[answer] [varchar](300) NOT NULL,
 CONSTRAINT [PK_QA] PRIMARY KEY CLUSTERED 
(
	[qa_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[State]    Script Date: 4/5/2024 23:28:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[State](
	[state_id] [bigint] NOT NULL,
	[name] [varchar](50) NOT NULL,
	[country_id] [smallint] NOT NULL,
 CONSTRAINT [PK_State] PRIMARY KEY CLUSTERED 
(
	[state_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Supplier]    Script Date: 4/5/2024 23:28:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Supplier](
	[supplier_id] [smallint] NOT NULL,
	[email] [varchar](300) NOT NULL,
	[password] [varbinary](64) NOT NULL,
	[telephone] [varbinary](20) NOT NULL,
 CONSTRAINT [PK_Supplier] PRIMARY KEY CLUSTERED 
(
	[supplier_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[User]    Script Date: 4/5/2024 23:28:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User](
	[user_id] [bigint] IDENTITY(1,1) NOT NULL,
	[name] [varchar](20) NOT NULL,
	[email] [varchar](300) NOT NULL,
	[password] [varbinary](256) NOT NULL,
	[telephone] [varchar](20) NOT NULL,
	[wishlist_id] [bigint] NULL,
	[is_admin] [bit] NOT NULL,
	[address] [varchar](300) NULL,
	[postal_code] [varchar](20) NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[user_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Wishlist]    Script Date: 4/5/2024 23:28:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Wishlist](
	[wishlist_id] [bigint] NOT NULL,
	[product_count] [bigint] NOT NULL,
 CONSTRAINT [PK_Wishlist] PRIMARY KEY CLUSTERED 
(
	[wishlist_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Address]  WITH CHECK ADD  CONSTRAINT [FK_Address_City] FOREIGN KEY([city_id])
REFERENCES [dbo].[City] ([city_id])
GO
ALTER TABLE [dbo].[Address] CHECK CONSTRAINT [FK_Address_City]
GO
ALTER TABLE [dbo].[Auction]  WITH CHECK ADD  CONSTRAINT [FK_Auction_Product] FOREIGN KEY([product_id])
REFERENCES [dbo].[Product] ([product_id])
GO
ALTER TABLE [dbo].[Auction] CHECK CONSTRAINT [FK_Auction_Product]
GO
ALTER TABLE [dbo].[Bid]  WITH CHECK ADD  CONSTRAINT [FK_Bid_Auction] FOREIGN KEY([auction_id])
REFERENCES [dbo].[Auction] ([auction_id])
GO
ALTER TABLE [dbo].[Bid] CHECK CONSTRAINT [FK_Bid_Auction]
GO
ALTER TABLE [dbo].[Bid]  WITH CHECK ADD  CONSTRAINT [FK_Bid_User] FOREIGN KEY([user_id])
REFERENCES [dbo].[User] ([user_id])
GO
ALTER TABLE [dbo].[Bid] CHECK CONSTRAINT [FK_Bid_User]
GO
ALTER TABLE [dbo].[Branch]  WITH CHECK ADD  CONSTRAINT [FK_Branch_Address] FOREIGN KEY([address_id])
REFERENCES [dbo].[Address] ([address_id])
GO
ALTER TABLE [dbo].[Branch] CHECK CONSTRAINT [FK_Branch_Address]
GO
ALTER TABLE [dbo].[BranchXAdmin]  WITH CHECK ADD  CONSTRAINT [FK_BranchXAdmin_Admin] FOREIGN KEY([admin_id])
REFERENCES [dbo].[Admin] ([admin_id])
GO
ALTER TABLE [dbo].[BranchXAdmin] CHECK CONSTRAINT [FK_BranchXAdmin_Admin]
GO
ALTER TABLE [dbo].[BranchXAdmin]  WITH CHECK ADD  CONSTRAINT [FK_BranchXAdmin_Branch] FOREIGN KEY([branch_id])
REFERENCES [dbo].[Branch] ([branch_id])
GO
ALTER TABLE [dbo].[BranchXAdmin] CHECK CONSTRAINT [FK_BranchXAdmin_Branch]
GO
ALTER TABLE [dbo].[Cart]  WITH CHECK ADD  CONSTRAINT [FK_Cart_Branch] FOREIGN KEY([branch_id])
REFERENCES [dbo].[Branch] ([branch_id])
GO
ALTER TABLE [dbo].[Cart] CHECK CONSTRAINT [FK_Cart_Branch]
GO
ALTER TABLE [dbo].[Cart]  WITH CHECK ADD  CONSTRAINT [FK_Cart_User] FOREIGN KEY([user_id])
REFERENCES [dbo].[User] ([user_id])
GO
ALTER TABLE [dbo].[Cart] CHECK CONSTRAINT [FK_Cart_User]
GO
ALTER TABLE [dbo].[Category]  WITH CHECK ADD  CONSTRAINT [FK_Category_Category] FOREIGN KEY([parent_category])
REFERENCES [dbo].[Category] ([category_id])
GO
ALTER TABLE [dbo].[Category] CHECK CONSTRAINT [FK_Category_Category]
GO
ALTER TABLE [dbo].[CategoryXUser]  WITH CHECK ADD  CONSTRAINT [FK_CategoryXUser_Category] FOREIGN KEY([category_id])
REFERENCES [dbo].[Category] ([category_id])
GO
ALTER TABLE [dbo].[CategoryXUser] CHECK CONSTRAINT [FK_CategoryXUser_Category]
GO
ALTER TABLE [dbo].[CategoryXUser]  WITH CHECK ADD  CONSTRAINT [FK_CategoryXUser_User] FOREIGN KEY([user_id])
REFERENCES [dbo].[User] ([user_id])
GO
ALTER TABLE [dbo].[CategoryXUser] CHECK CONSTRAINT [FK_CategoryXUser_User]
GO
ALTER TABLE [dbo].[City]  WITH CHECK ADD  CONSTRAINT [FK_City_State] FOREIGN KEY([state_id])
REFERENCES [dbo].[State] ([state_id])
GO
ALTER TABLE [dbo].[City] CHECK CONSTRAINT [FK_City_State]
GO
ALTER TABLE [dbo].[Comment]  WITH CHECK ADD  CONSTRAINT [FK_Comment_Product] FOREIGN KEY([product_id])
REFERENCES [dbo].[Product] ([product_id])
GO
ALTER TABLE [dbo].[Comment] CHECK CONSTRAINT [FK_Comment_Product]
GO
ALTER TABLE [dbo].[Comment]  WITH CHECK ADD  CONSTRAINT [FK_Comment_User] FOREIGN KEY([user_id])
REFERENCES [dbo].[User] ([user_id])
GO
ALTER TABLE [dbo].[Comment] CHECK CONSTRAINT [FK_Comment_User]
GO
ALTER TABLE [dbo].[CommentXUser]  WITH CHECK ADD  CONSTRAINT [FK_CommentXUser_User] FOREIGN KEY([user_id])
REFERENCES [dbo].[User] ([user_id])
GO
ALTER TABLE [dbo].[CommentXUser] CHECK CONSTRAINT [FK_CommentXUser_User]
GO
ALTER TABLE [dbo].[Inventory]  WITH CHECK ADD  CONSTRAINT [FK_Inventory_Admin] FOREIGN KEY([admin_id])
REFERENCES [dbo].[Admin] ([admin_id])
GO
ALTER TABLE [dbo].[Inventory] CHECK CONSTRAINT [FK_Inventory_Admin]
GO
ALTER TABLE [dbo].[Inventory]  WITH CHECK ADD  CONSTRAINT [FK_Inventory_Branch] FOREIGN KEY([branch_id])
REFERENCES [dbo].[Branch] ([branch_id])
GO
ALTER TABLE [dbo].[Inventory] CHECK CONSTRAINT [FK_Inventory_Branch]
GO
ALTER TABLE [dbo].[Inventory]  WITH CHECK ADD  CONSTRAINT [FK_Inventory_InventoryState] FOREIGN KEY([inventory_state_id])
REFERENCES [dbo].[InventoryState] ([inventory_state_id])
GO
ALTER TABLE [dbo].[Inventory] CHECK CONSTRAINT [FK_Inventory_InventoryState]
GO
ALTER TABLE [dbo].[Inventory]  WITH CHECK ADD  CONSTRAINT [FK_Inventory_Product] FOREIGN KEY([product_id])
REFERENCES [dbo].[Product] ([product_id])
GO
ALTER TABLE [dbo].[Inventory] CHECK CONSTRAINT [FK_Inventory_Product]
GO
ALTER TABLE [dbo].[Inventory]  WITH CHECK ADD  CONSTRAINT [FK_Inventory_ProductEntryRequest] FOREIGN KEY([entry_request_id])
REFERENCES [dbo].[ProductEntryRequest] ([entry_request_id])
GO
ALTER TABLE [dbo].[Inventory] CHECK CONSTRAINT [FK_Inventory_ProductEntryRequest]
GO
ALTER TABLE [dbo].[PicXProduct]  WITH CHECK ADD  CONSTRAINT [FK_PicXProduct_Pic] FOREIGN KEY([pic_id])
REFERENCES [dbo].[Pic] ([pic_id])
GO
ALTER TABLE [dbo].[PicXProduct] CHECK CONSTRAINT [FK_PicXProduct_Pic]
GO
ALTER TABLE [dbo].[PicXProduct]  WITH CHECK ADD  CONSTRAINT [FK_PicXProduct_Product] FOREIGN KEY([product_id])
REFERENCES [dbo].[Product] ([product_id])
GO
ALTER TABLE [dbo].[PicXProduct] CHECK CONSTRAINT [FK_PicXProduct_Product]
GO
ALTER TABLE [dbo].[Product]  WITH CHECK ADD  CONSTRAINT [FK_Product_Brand] FOREIGN KEY([brand_id])
REFERENCES [dbo].[Brand] ([brand_id])
GO
ALTER TABLE [dbo].[Product] CHECK CONSTRAINT [FK_Product_Brand]
GO
ALTER TABLE [dbo].[Product]  WITH CHECK ADD  CONSTRAINT [FK_Product_Category] FOREIGN KEY([category_id])
REFERENCES [dbo].[Category] ([category_id])
GO
ALTER TABLE [dbo].[Product] CHECK CONSTRAINT [FK_Product_Category]
GO
ALTER TABLE [dbo].[Product]  WITH CHECK ADD  CONSTRAINT [FK_Product_ProductState] FOREIGN KEY([state_id])
REFERENCES [dbo].[ProductState] ([product_state_id])
GO
ALTER TABLE [dbo].[Product] CHECK CONSTRAINT [FK_Product_ProductState]
GO
ALTER TABLE [dbo].[ProductEntryRequest]  WITH CHECK ADD  CONSTRAINT [FK_ProductEntryRequest_Product] FOREIGN KEY([product_id])
REFERENCES [dbo].[Product] ([product_id])
GO
ALTER TABLE [dbo].[ProductEntryRequest] CHECK CONSTRAINT [FK_ProductEntryRequest_Product]
GO
ALTER TABLE [dbo].[ProductEntryRequest]  WITH CHECK ADD  CONSTRAINT [FK_ProductEntryRequest_Supplier] FOREIGN KEY([supplier_id])
REFERENCES [dbo].[Supplier] ([supplier_id])
GO
ALTER TABLE [dbo].[ProductEntryRequest] CHECK CONSTRAINT [FK_ProductEntryRequest_Supplier]
GO
ALTER TABLE [dbo].[ProductXCart]  WITH CHECK ADD  CONSTRAINT [FK_ProductXCart_Cart] FOREIGN KEY([cart_id])
REFERENCES [dbo].[Cart] ([cart_id])
GO
ALTER TABLE [dbo].[ProductXCart] CHECK CONSTRAINT [FK_ProductXCart_Cart]
GO
ALTER TABLE [dbo].[ProductXCart]  WITH CHECK ADD  CONSTRAINT [FK_ProductXCart_Product] FOREIGN KEY([product_id])
REFERENCES [dbo].[Product] ([product_id])
GO
ALTER TABLE [dbo].[ProductXCart] CHECK CONSTRAINT [FK_ProductXCart_Product]
GO
ALTER TABLE [dbo].[ProductXWishlist]  WITH CHECK ADD  CONSTRAINT [FK_ProductXWishlist_Product] FOREIGN KEY([product_id])
REFERENCES [dbo].[Product] ([product_id])
GO
ALTER TABLE [dbo].[ProductXWishlist] CHECK CONSTRAINT [FK_ProductXWishlist_Product]
GO
ALTER TABLE [dbo].[ProductXWishlist]  WITH CHECK ADD  CONSTRAINT [FK_ProductXWishlist_Wishlist] FOREIGN KEY([wishlist_id])
REFERENCES [dbo].[Wishlist] ([wishlist_id])
GO
ALTER TABLE [dbo].[ProductXWishlist] CHECK CONSTRAINT [FK_ProductXWishlist_Wishlist]
GO
ALTER TABLE [dbo].[State]  WITH CHECK ADD  CONSTRAINT [FK_State_Country] FOREIGN KEY([country_id])
REFERENCES [dbo].[Country] ([country_id])
GO
ALTER TABLE [dbo].[State] CHECK CONSTRAINT [FK_State_Country]
GO
ALTER TABLE [dbo].[User]  WITH CHECK ADD  CONSTRAINT [FK_User_Wishlist] FOREIGN KEY([wishlist_id])
REFERENCES [dbo].[Wishlist] ([wishlist_id])
GO
ALTER TABLE [dbo].[User] CHECK CONSTRAINT [FK_User_Wishlist]
GO
/****** Object:  StoredProcedure [dbo].[SP_create_user]    Script Date: 4/5/2024 23:28:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_create_user]
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
GO
/****** Object:  StoredProcedure [dbo].[SP_get_brands]    Script Date: 4/5/2024 23:28:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_get_brands]
AS
BEGIN
    SELECT name
    FROM Brand
    ORDER BY name;
END;
GO
/****** Object:  StoredProcedure [dbo].[SP_get_categories]    Script Date: 4/5/2024 23:28:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_get_categories]
AS
BEGIN
    SELECT name
    FROM Category
    ORDER BY name;
END;
GO
/****** Object:  StoredProcedure [dbo].[SP_get_products]    Script Date: 4/5/2024 23:28:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_get_products]
AS
BEGIN
    SELECT p.name, p.description, p.outlet_price, p.price, p.discount, p.amount, b.name AS brand, c.name AS category
    FROM Product p
    LEFT JOIN Brand b on p.brand_id = b.brand_id
    LEFT JOIN Category c on p.category_id = c.category_id
    ORDER BY p.name;
END;
GO
/****** Object:  StoredProcedure [dbo].[SP_login]    Script Date: 4/5/2024 23:28:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_login]
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
GO
/****** Object:  StoredProcedure [dbo].[SP_update_user]    Script Date: 4/5/2024 23:28:50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_update_user]
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
GO
