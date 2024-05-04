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


if __name__ == '__main__':
    app.run(debug=True)
