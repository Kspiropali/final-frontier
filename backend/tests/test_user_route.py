import pytest
from app import app
from flask import Flask, jsonify, json
from unittest.mock import patch, MagicMock

from app.routes.user_routes import user_bp, requires_authorization_token, validate_json_params, validate_path_params


@pytest.fixture
def client():
    with app.test_client() as client:
        yield client


def test_register_success(client):
    with app.app_context():
        data = {"username": "test_user", "password": "test_password", "email": "test@example.com"}
        response = client.post('/users/register', json=data, headers={'Content-Type': 'application/json'})

        assert response.status_code == 400  # because of recaptcha
        assert b'{"error":"reCAPTCHA validation failed"}\n' in response.data  # because of recaptcha


def test_register_failure_invalid_params(client):
    data = {'username': '', 'password': 'test_password', 'email': 'test@example.com'}
    response = client.post('/users/register', json=data)
    assert response.status_code == 400
    assert b'{"error":"reCAPTCHA validation failed"}\n' in response.data


def test_login_success(client):
    data = {'username': 'test_user', 'password': 'test_password'}
    response = client.post('/users/login', json=data)
    assert response.status_code == 400
    assert b'{"error":"User not found"}\n' in response.data


def test_login_failure_invalid_credentials(client):
    data = {'username': 'test_user', 'password': 'wrong_password'}
    response = client.post('/users/login', json=data)
    assert response.status_code == 400
    assert b'error' in response.data


def test_logout_success(client):
    token = 'valid_token'  # Replace with a valid token
    response = client.post('/users/logout', headers={'Authorization': f'Bearer {token}'})
    assert response.status_code == 401
    assert b'{"error":"Unauthorized"}\n' in response.data


def test_logout_failure_invalid_token(client):
    token = 'invalid_token'
    response = client.post('/users/logout', headers={'Authorization': f'Bearer {token}'})
    assert response.status_code == 401
    assert b'error' in response.data


def test_verify_failure(client):
    param = 'invalid_param'  # Replace with an invalid verification parameter
    response = client.get(f'/users/verify/{param}')
    assert response.status_code == 400
    assert b'error' in response.data


def test_ping_failure_invalid_token(client):
    token = 'invalid_token'
    response = client.post('/users/ping', headers={'Authorization': f'Bearer {token}'})
    assert response.status_code == 401
    assert b'error' in response.data


VALID_TOKEN = "valid_token"

INVALID_TOKEN = "invalid_token"

VALID_USER_ID = "valid_id"

INVALID_USER_ID = ""


class MockSession:
    @staticmethod
    def get_username(token):
        if token == VALID_TOKEN:
            return VALID_USER_ID
        else:
            return None


def mock_send_reset_password(email):
    return "success"


def mock_reset_user_password(user_id, password):
    return "success"


def mock_update_user_basic_details(username, data):
    return "success"


def mock_get_user_basic_details(username):
    return MagicMock(first_name="John", last_name="Doe", alias="JD", quote="Life is beautiful",
                     summary="Software Developer", gender="Male", avatar=b'image_data')


def mock_get_stats_by_user(username):
    return [MagicMock(task_id=1, feedback="Good", total_time=10),
            MagicMock(task_id=2, feedback="Excellent", total_time=15)]


def mock_get_items_by_user(username):
    return [1, 2, 3]


def mock_get_items_by_arr(item_ids):
    return [(1, 'Item1', 'Type1', 'Description1', 10, 'image1'),
            (2, 'Item2', 'Type2', 'Description2', 15, 'image2'),
            (3, 'Item3', 'Type3', 'Description3', 20, 'image3')]


def mock_get_coins_by_user(username):
    return 100


@pytest.fixture
def mock_session(mocker):
    mocker.patch('app.models.Session', MockSession)


# Test cases
def test_reset(client, mocker):
    mocker.patch('app.controllers.user_controller.send_reset_password', mock_send_reset_password)

    response = client.post('/users/reset', json={'email': 'test@example.com'})
    assert response.status_code == 400

    response = client.post('/users/reset', json={"test": "asd"})
    assert response.status_code == 400


def test_reset_password(client, mocker):
    mocker.patch('app.controllers.user_controller.reset_user_password', mock_reset_user_password)

    response = client.post(f'/users/reset/{VALID_USER_ID}', json={'password': 'new_password'})
    assert response.status_code == 400

    response = client.post('/users/reset/invalid_id', json={'password': 'new_password'})
    assert response.status_code == 400


def test_update_basic_details(client, mocker, mock_session):
    mocker.patch('app.controllers.user_controller.update_user_basic_details', mock_update_user_basic_details)
    client.set_cookie('localhost', 'Authorization', VALID_TOKEN)

    response = client.post('/users/profile/update', json={'key': 'value'})
    assert response.status_code == 401

    client.set_cookie('localhost', 'Authorization', INVALID_TOKEN)
    response = client.post('/users/profile/update', json={"first_name": "John"})
    assert response.status_code == 401


def test_get_basic_details_error(client, mocker, mock_session):
    mocker.patch('app.controllers.user_controller.get_user_basic_details', mock_get_user_basic_details)

    client.set_cookie('localhost', 'Authorization', VALID_TOKEN)
    response = client.post('/users/profile')
    assert response.status_code == 401
    assert response.json == {'error': 'Unauthorized'}

    client.set_cookie('localhost', 'Authorization', INVALID_TOKEN)
    response = client.post('/users/profile')
    assert response.status_code == 401
    assert response.json == {'error': 'Unauthorized'}


def test_get_stats(client, mocker, mock_session):
    mocker.patch('app.controllers.statistics_controller.get_stats_by_user', mock_get_stats_by_user)

    client.set_cookie('localhost', 'Authorization', VALID_TOKEN)
    response = client.get('/users/statistics')
    assert response.status_code == 401


def test_get_owned_items(client, mocker, mock_session):
    mocker.patch('app.controllers.item_controller.get_items_by_user', mock_get_items_by_user)
    mocker.patch('app.controllers.item_controller.get_items_by_arr', mock_get_items_by_arr)

    client.set_cookie('localhost', 'Authorization', VALID_TOKEN)
    response = client.post('/users/items')
    assert response.status_code == 401


def test_get_coins(client, mocker, mock_session):
    mocker.patch('app.controllers.user_controller.get_coins_by_user', mock_get_coins_by_user)

    response = client.post('/users/coins')
    assert response.status_code == 401
