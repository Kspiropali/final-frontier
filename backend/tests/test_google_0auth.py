import pytest
from flask import url_for
from app import app


@pytest.fixture
def client():
    return app.test_client()


@pytest.fixture
def mock_oauth_responses(client):
    # Mock Google OAuth user info response
    requests_mock.get('https://www.googleapis.com/oauth2/v1/userinfo', json={'email': 'test@example.com'})
    # ... mock other responses if needed
    return requests_mock


def test_google_oauth_login(client):
    response = client.get('/auth/google/login')
    assert response.status_code == 302  # Assuming successful redirect


def test_google_oauth_callback(client):
    response = client.get('/auth/google/callback')  # Assuming a valid code
    assert response.status_code == 400  # Assuming not successful since called directly
