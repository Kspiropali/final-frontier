from sqlalchemy import text
from sqlalchemy.exc import OperationalError
from flask import Flask
from . import db


def initialize_db(app: Flask):
    db.init_app(app)

    # Check if the database connection is valid
    if not is_db_connected():
        print("Database connection is not valid. Check your configuration.")
        exit(1)


def is_db_connected():
    try:
        db.engine.connect()
        return True
    except OperationalError:
        return False


def setup_tables():
    # runs the schema.sql file to create the tables
    try:
        # Read the SQL script
        with open('app/database/schema.sql', 'r') as f:
            sql = f.read()

        # Execute the SQL script
        with db.engine.connect() as con:
            con.execute(text(sql))
            con.commit()

        print("SQL script executed successfully.")

    except Exception as e:
        print(f"Error: {e}")
        exit(1)
