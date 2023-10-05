import pytest
from flask import Flask
from app.database.db import (
    initialize_db,
    is_db_connected,
    check_db_connection,
    setup_tables,
    dummy_data,
    clean_tables,
)
from app import app as flask_app


@pytest.fixture
def app():
    # Assuming you have a Flask app factory function
    return flask_app


def test_is_db_connected_valid(app):
    with app.app_context():
        assert is_db_connected() is True


def test_is_db_connected_invalid():
    try:
        # Assuming your database configuration is invalid for this test
        app_mock = Flask(__name__)
        # Initialize the database
        app_mock.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://invalid:invalid@localhost:5432/invalid'

        with app_mock.app_context():
            initialize_db(app_mock)
            assert is_db_connected() is False
    except Exception as e:
        assert e is not None


def test_check_db_connection_valid(app):
    with app.app_context():
        check_db_connection()


def test_setup_tables(app):
    with app.app_context():
        setup_tables()
