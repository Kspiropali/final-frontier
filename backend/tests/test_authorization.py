# tests/conftest.py
import pytest
from unittest.mock import patch, MagicMock, Mock
from flask import Flask, jsonify
from app import app


@pytest.fixture
def client():
    return app.test_client()


# Mock implementation of Session.check_token_exists
class MockSession:
    @classmethod
    def check_token_exists(cls, token):
        # For testing, consider any token starting with 'valid_' as valid
        return token.startswith('valid_')


@pytest.fixture
def mocker():
    from unittest.mock import Mock
    return MockSession


def test_requires_authorization_token_success(client):
    # Mock the Session.check_token_exists method to return True
    patch('app.models.Session.check_token_exists', return_value=True)
    # path the Session.check_token_exists method to return True
    with patch('app.models.Session.Session.check_token_exists', return_value=True):

        # Assuming your middleware uses the Authorization token from the cookies
        client.set_cookie('localhost', 'Authorization', 'valid_token')

        response = client.post('/users/logout')
        assert response.status_code == 400


def test_requires_authorization_token_failure(client, mocker):
    # No Authorization token provided
    response = client.post('/users/logout')
    assert response.status_code == 401
    assert response.json == {"error": "Unauthorized"}

    # Set an invalid token cookie
    client.set_cookie('localhost', 'Authorization', 'invalid_token')
    response = client.post('/users/logout')
    assert response.status_code == 401
    assert response.json == {"error": "Unauthorized"}
