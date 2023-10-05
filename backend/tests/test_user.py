import pytest
from unittest.mock import patch, MagicMock, Mock
from app.models.User import User
from app.database.db import db, setup_tables, clean_tables
from app import app as flask_app
from sqlalchemy import create_engine


@pytest.fixture
def app():
    app = flask_app.test_client()
    with flask_app.app_context():
        setup_tables()
        yield app
        clean_tables()


def test_create_user_with_constructor(app):
    user = User(0, 'test_email', 'test_username', 'test_password',
                100, 'data:image', "date", [], [], True, True, 1, "asd")
    assert user.email == 'test_email'


def test_create_user(app):
    result = User.create(username='test_user1', password='test_password1', email='test1@example.com')
    assert result == 'success'


def test_get_user(app):
    user_id = 1
    User.create(username='test_user', password='test_password', email='test@example.com')
    user = User.get_user(user_id)
    assert user.id == user_id


def test_get_users(app):
    User.create(username='test_user1', password='test_password', email='test1@example.com')
    User.create(username='test_user2', password='test_password', email='test2@example.com')
    users = User.get_users()
    assert len(users) == 2


def test_update_user(app):
    user_id = 1
    User.create(username='test_user', password='test_password', email='test@example.com')
    updated_data = {'coins': 100}
    result = User.update(user_id, updated_data)
    assert result == 'success'


def test_delete_user(app):
    user_id = 1
    User.create(username='test_user', password='test_password', email='test@example.com')
    result = User.delete(user_id)
    assert User.delete(1).rowcount == 0
    assert result.rowcount == 1


def test_update(app):
    user_id = 1
    User.create(username='test_user', password='test_password', email="asdasd")
    result = User.update(user_id, {'email': "asdasd"})
    assert result == 'success'


def test_find_user_by_email(app):
    email = 'test@example.com'
    User.create(username='test_user', password='test_password', email=email)
    user = User.find_by_email(email)
    assert user.email == email


def test_find_user_by_username(app):
    username = 'test_user'
    User.create(username=username, password='test_password', email='test@example.com')
    user = User.find_by_username(username)
    assert user.username == username


def test_activate_user(app):
    user_id = 1
    User.create(username='test_user', password='test_password', email='test@example.com')
    result = User.activate_user(user_id)
    assert result.rowcount == 1


def test_update_password(app):
    user_id = 1
    User.create(username='test_user', password='test_password', email='test@example.com')
    new_password = 'new_password'
    result = User.update_password(user_id, new_password)
    assert result.rowcount == 1


def test_update_coins(app):
    user_id = 1
    User.create(username='test_user', password='test_password', email='test@example.com')
    new_coins = 100
    result = User.update_coins(user_id, new_coins)
    assert result.rowcount == 1
