import pytest
from app.database.db import db, setup_tables, clean_tables
from app import app
from sqlalchemy import create_engine, func


@pytest.fixture
def client():
    # with app.app_context():
    client = app.test_client()
    with app.test_client() as client:
        setup_tables()
        yield client
        clean_tables()


# 1. Update single task
# def test_update_task(client):
#     with app.app_context():
#
#         param = 1
#         data = {'name': 'task1_update_test', 'description': 'task1_update_description'}
#         response = client.patch(f'/tasks/{param}', json=data, headers={'Content-Type': 'application/json'})
#
#         assert response.status_code == 200
#         assert b'error' in response.data


# def test_register_failure_invalid_params(client):
#     data = {'username': '', 'password': 'test_password', 'email': 'test@example.com'}
#     response = client.post('/users//register', json=data)
#     assert response.status_code == 400
#     assert b'error' in response.data


# # 2. User Login
# def test_login_success(client):
#     data = {'username': 'test_user', 'password': 'test_password'}
#     response = client.post('/users/login', json=data)
#     assert response.status_code == 400
#     assert b'{"error":"User is not activated"}\n' in response.data


# def test_login_failure_invalid_credentials(client):
#     data = {'username': 'test_user', 'password': 'wrong_password'}
#     response = client.post('/users/login', json=data)
#     assert response.status_code == 400
#     assert b'error' in response.data


# # 3. User Logout
# def test_logout_success(client):
#     token = 'valid_token'  # Replace with a valid token
#     response = client.post('/users/logout', headers={'Authorization': f'Bearer {token}'})
#     assert response.status_code == 401
#     assert b'{"error":"Unauthorized"}\n' in response.data


# def test_logout_failure_invalid_token(client):
#     token = 'invalid_token'
#     response = client.post('/users/logout', headers={'Authorization': f'Bearer {token}'})
#     assert response.status_code == 401
#     assert b'error' in response.data


# def test_verify_failure(client):
#     param = 'invalid_param'  # Replace with an invalid verification parameter
#     response = client.get(f'/users/verify/{param}')
#     assert response.status_code == 400
#     assert b'error' in response.data


# def test_ping_failure_invalid_token(client):
#     token = 'invalid_token'
#     response = client.post('/users/ping', headers={'Authorization': f'Bearer {token}'})
#     assert response.status_code == 401
#     assert b'error' in response.data
