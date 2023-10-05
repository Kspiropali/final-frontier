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

        for i in range(2, 7):
            character_file = f'app/database/data/character{i}.txt'
            with open(character_file, 'r') as f:
                character_content = f.read()

            # Replace the placeholder in the data
            placeholder = "{" + f'{{CHARACTER{i}}}' + "}"
            data = data.replace(placeholder, character_content)

        for i in range (1, 19):
            item = f'app/database/data/item{i}.txt'
            with open(item, 'r') as f:
                item_content = f.read()

            # Replace the placeholder in the data
            placeholder = "{" + f'{{ITEM{i}}}' + "}"
            data = data.replace(placeholder, item_content)

        for i in range (1, 16):
            background = f'app/database/data/background{i}.txt'
            with open(background, 'r') as f:
                background_content = f.read()

            # Replace the placeholder in the data
            placeholder = "{" + f'{{BACKGROUND{i}}}' + "}"
            data = data.replace(placeholder, background_content)

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
