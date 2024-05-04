from flask import request, jsonify
from sqlalchemy import text


def login(engine):
    email = request.json["email"]
    password = request.json["password"]

    try:
        conn = engine.connect()
        result = conn.execute(text(f"EXEC SP_login @email = '{email}', @password = '{password}'")).fetchone()
        conn.commit()
        conn.close()

        if result.code == 200:
            return jsonify({'name': result.name, 'email': result.email, 'phone': result.phone,
                            'is_admin': result.is_admin, 'address': result.address,
                            'postal_code': result.postal_code}), result.code
        else:
            return jsonify({'message': result.message}), result.code
    except Exception as e:
        print(str(e))
        return jsonify({"message": "Fallo inesperado en la conexión"}), 401


def register(engine):
    email = request.json["email"]
    password = request.json["password"]
    name = request.json["name"]
    phone = request.json["phone"]

    try:
        conn = engine.connect()
        result = conn.execute(text(f"EXEC SP_create_user @name = '{name}', @email = '{email}', @password = '{password}', @telephone = '{phone}'")).fetchone()
        conn.commit()
        conn.close()

        return jsonify({'message': result.message}), result.code
    except Exception as e:
        print(str(e))
        return jsonify({"message": "Fallo inesperado en la conexión"}), 401


def update_user(engine):
    new_email = request.json["new_email"]
    email = request.json["email"]
    address = request.json["address"]
    name = request.json["name"]
    phone = request.json["phone"]
    postal_code = request.json["postal_code"]

    try:
        conn = engine.connect()
        result = conn.execute(text(f"EXEC SP_update_user @email = '{email}', @name = '{name}',"
                                   f" @new_email = '{new_email}', @telephone = '{phone}', @address = '{address}',"
                                   f" @postal_code = '{postal_code}'")).fetchone()
        conn.commit()
        conn.close()

        return jsonify({'message': result.message}), result.code
    except Exception as e:
        print(str(e))
        return jsonify({"message": "Fallo inesperado en la conexión"}), 401
