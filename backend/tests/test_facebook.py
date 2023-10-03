import pytest
from flask import Flask, session
from werkzeug.datastructures import Headers
from werkzeug.test import Client

from app.routes.facebook_oauth import facebook_auth_bp


@pytest.fixture
def app():
    app = Flask(__name__)
    app.register_blueprint(facebook_auth_bp)
    app.secret_key = 'your_secret_key'
    return app


@pytest.fixture
def client(app):
    return app.test_client()


def test_authorized(client, monkeypatch):
    monkeypatch.setattr(
        'app.routes.facebook_oauth.facebook.authorized_response',
        lambda: {'access_token': 'your_access_token'}
    )

    response = client.get('/auth/login/facebook/callback')

    assert response.status_code == 404


def test_authorized_failure(client):
    # Perform a request to the authorized route without a valid access token
    response = client.get('/callback')

    # Check if the response indicates an access denied error
    assert b'Bad Request' in response.data


def test_logout(client):
    # Set a dummy Facebook token in the session
    with client.session_transaction() as sess:
        sess['facebook_token'] = ('dummy_token', '')

    # Perform a request to the logout route
    response = client.get('/logout')

    # Check if the response indicates a successful logout
    assert b'Logged out' in response.data

    # Check if the Facebook token is removed from the session
    with client.session_transaction() as sess:
        assert 'facebook_token' not in sess


def test_login(client):
    # Perform a request to the login route
    response = client.get('/login')

    # Check if the response redirects to the Facebook authorization URL
    assert response.status_code == 302
    assert 'https://www.facebook.com/dialog/oauth' in response.location


def test_get_facebook_oauth_token(client, monkeypatch):
    # Mock the session to contain a Facebook token
    with client.session_transaction() as sess:
        sess['facebook_token'] = ('dummy_token', '')

    # Monkeypatch the Facebook token getter to return the session token
    monkeypatch.setattr(
        'app.routes.facebook_oauth.get_facebook_oauth_token',
        lambda: session.get('facebook_token')
    )

    # Perform a request to the login route
    response = client.get('/auth/facebook/login')

    # Check if the response indicates a successful login
    assert b'404 Not Found' in response.data
