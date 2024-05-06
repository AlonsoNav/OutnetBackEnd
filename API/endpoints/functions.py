from flask import request, jsonify
from sqlalchemy import text
import base64
import json


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
        result = conn.execute(text(
            f"EXEC SP_create_user @name = '{name}', @email = '{email}', @password = '{password}', @telephone = '{phone}'")).fetchone()
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


def get(engine, sp):
    try:
        conn = engine.connect()
        result = conn.execute(text(f"EXEC {sp}")).fetchall()
        conn.commit()
        conn.close()

        list = [{'name': row.name} for row in result]
        return jsonify({'list': list}), 200
    except Exception as e:
        print(str(e))
        return jsonify({"message": "Fallo inesperado en la conexión"}), 401


def get_products(engine):
    try:
        conn = engine.connect()
        result = conn.execute(text(f"EXEC SP_get_products")).fetchall()
        conn.commit()
        conn.close()

        products_list = [{'name': row.name, 'description': row.description, 'outlet_price': row.outlet_price,
                          'price': row.price, 'discount': row.discount, 'amount': row.amount, 'brand': row.brand,
                          'category': row.category} for row in result]
        return jsonify({'products': products_list}), 200
    except Exception as e:
        print(str(e))
        return jsonify({"message": "Fallo inesperado en la conexión"}), 401


def upload_image(engine):
    image = request.files['image'].read()
    description = request.form.get('description')
    try:
        conn = engine.connect()
        result = conn.execute(text("EXEC SP_upload_image @description = :description, @image = :image"),
                              {'description': description, 'image': image}).fetchone()
        conn.commit()
        conn.close()

        return jsonify({'message': 'Imagen subida exitosamente', 'id': result.pic_id,
                       'image': base64.b64encode(image).decode('utf-8')}), 200
    except Exception as e:
        print(str(e))
        return jsonify({"message": "Fallo inesperado en la conexión"}), 401


def get_images(engine):
    try:
        conn = engine.connect()
        result = conn.execute(text(f"EXEC SP_get_images")).fetchall()
        conn.commit()
        conn.close()

        images_list = [{'id': row.pic_id, 'description': row.description,
                        'image': base64.b64encode(row.image).decode('utf-8')} for row in result]
        return jsonify({'images': images_list}), 200
    except Exception as e:
        print(str(e))
        return jsonify({"message": "Fallo inesperado en la conexión"}), 401


def delete_image(engine):
    id = request.json["id"]
    try:
        conn = engine.connect()
        result = conn.execute(text("EXEC SP_delete_image @id = :id"), {'id': id})
        conn.commit()
        conn.close()

        return jsonify({'message': 'Imagen eliminada exitosamente'}), 200
    except Exception as e:
        print(str(e))
        return jsonify({"message": "Fallo inesperado en la conexión"}), 401


def create_product(engine):
    name = request.json["name"]
    description = request.json["description"]
    price = request.json["price"]
    outlet_price = request.json["outlet_price"]
    category = request.json["category"]
    brand = request.json["brand"]
    images = json.dumps(request.json["images"])
    try:
        conn = engine.connect()
        result = conn.execute(text("EXEC SP_create_product @name = :name, @description = :description, @price = :price,"
                                   " @outlet_price = :outlet_price, @category = :category, @brand = :brand,"
                                   " @images = :images"),
                              {'name': name, 'description': description, 'price': price, 'outlet_price': outlet_price,
                               'category': category, 'brand': brand, 'images': images})
        conn.commit()
        conn.close()

        return jsonify({'message': 'Producto agregado correctamente.'}), 200
    except Exception as e:
        print(str(e))
        return jsonify({"message": "Fallo inesperado en la conexión"}), 401
