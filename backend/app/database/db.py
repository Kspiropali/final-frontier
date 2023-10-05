from sqlalchemy import text
from sqlalchemy.exc import OperationalError
from flask import Flask
from . import db


def initialize_db(app: Flask):
    db.init_app(app)

    # Check if the database connection is valid
    if not is_db_connected():
        raise Exception("Database connection is not valid. Check your configuration.")


def is_db_connected():
    try:
        db.engine.connect()
        return True
    except OperationalError:
        return False


def check_db_connection():
    try:
        engine = db.create_engine(db.engine.url)
        connection = engine.connect()
        connection.close()

        print("Database health check: OK")
    except Exception as e:
        raise e

    return


def setup_tables():
    # runs the schema.sql file to create the tables
    try:
        # Read the SQL script
        with open('app/database/schema.sql', 'r') as f:
            sql = f.read()

        # reading the default data
        with open('app/database/data/default_avatar.txt', 'r') as f:
            default_avatar = f.read()
        with open('app/database/data/default_background.txt', 'r') as f:
            default_background = f.read()
        with open('app/database/data/default_character.txt', 'r') as f:
            default_character = f.read()

        # replace the query string with above base64 files
        sql = sql.replace("{{DEFAULT_AVATAR}}", default_avatar)
        sql = sql.replace("{{DEFAULT_BACKGROUND}}", default_background)
        sql = sql.replace("{{DEFAULT_CHARACTER}}", default_character)

        # Execute the SQL script
        with db.engine.connect() as con:
            con.execute(text(sql))
            con.commit()

    except Exception as e:
        raise e


def dummy_data():
    try:
        # Read the SQL script
        with open('app/database/data.sql', 'r') as f:
            data = f.read()

        with open('app/database/data/character2.txt', 'r') as f:
            character2 = f.read()

        with open('app/database/data/character3.txt', 'r') as f:
            character3 = f.read()

        with open('app/database/data/character4.txt', 'r') as f:
            character4 = f.read()

        with open('app/database/data/character5.txt', 'r') as f:
            character5 = f.read()

        with open('app/database/data/character6.txt', 'r') as f:
            character6 = f.read()

        # replace strings
        data = data.replace("{{CHARACTER2}}", character2)
        data = data.replace("{{CHARACTER3}}", character3)
        data = data.replace("{{CHARACTER4}}", character4)
        data = data.replace("{{CHARACTER5}}", character5)
        data = data.replace("{{CHARACTER6}}", character6)

        # Execute the SQL script
        with db.engine.connect() as con:
            con.execute(text(data))
            con.commit()

    except Exception as e:
        raise e


def clean_tables():
    try:
        # Read the SQL script
        with open('app/database/clean.sql', 'r') as f:
            sql = f.read()

        # Execute the SQL script
        with db.engine.connect() as con:
            con.execute(text(sql))
            con.commit()

    except Exception as e:
        raise e
