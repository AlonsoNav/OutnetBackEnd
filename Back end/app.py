from flask import Flask
from flask_cors import CORS
from sqlalchemy import create_engine
from endpoints import functions

DB_USER = "sa"
DB_PASS = "1234"
DB_HOST = "localhost"
DB_PORT = 1433
DB_NAME = "Outnet"
DB_DRIVER = "ODBC Driver 17 for SQL Server"

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
engine = create_engine(f"mssql+pyodbc://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}?driver={DB_DRIVER}")


@app.route('/login', methods=['POST'])
def login():
    return functions.login(engine)


@app.route('/register', methods=['POST'])
def register():
    return functions.register(engine)


@app.route('/update_user', methods=['POST'])
def update_user():
    return functions.update_user(engine)


@app.route('/get_categories', methods=['GET'])
def get_categories():
    return functions.get(engine, "SP_get_categories")


@app.route('/get_brands', methods=['GET'])
def get_brands():
    return functions.get(engine, "SP_get_brands")


@app.route('/get_products', methods=['GET'])
def get_products():
    return functions.get_products(engine)


@app.route('/get_inventory', methods=['GET'])
def get_inventory():
    return functions.get_inventory(engine)


@app.route('/upload_image', methods=['POST'])
def upload_image():
    return functions.upload_image(engine)


@app.route('/get_images', methods=['GET'])
def get_images():
    return functions.get_images(engine)


@app.route('/get_product_images', methods=['POST'])
def get_product_images():
    return functions.get_product_images(engine)
  
  
@app.route('/get_comments_product', methods=['GET'])
def get_comments_product():
    return functions.get_comments_product(engine)


@app.route('/get_products_images', methods=['GET'])
def get_product_image():
    return functions.get_products_images(engine)


@app.route('/delete_image', methods=['DELETE'])
def delete_image():
    return functions.delete_image(engine)


@app.route('/delete_comment', methods=['DELETE'])
def delete_comment():
    return functions.delete_comment(engine)


@app.route('/delete_product', methods=['DELETE'])
def delete_product():
    return functions.delete_product(engine)


@app.route('/create_product', methods=['POST'])
def create_product():
    return functions.create_product(engine)


@app.route('/update_product', methods=['POST'])
def update_product():
    return functions.update_product(engine)


@app.route('/inventory_request', methods=['POST'])
def inventory_request():
    return functions.inventory_request(engine)

  
@app.route('/create_sale', methods=['POST'])
def create_sale():
    return functions.create_sale(engine)


@app.route('/create_comment', methods=['POST'])
def create_comment():
    return functions.create_comment(engine)


if __name__ == '__main__':
    app.run(debug=True)
