import pytest
from app import app


@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client


@pytest.fixture
def test_app():
    # Create a Flask app for testing
    test_app = app.test_client()

    # Optional: Configure the app for testing if needed
    test_app.testing = True

    return test_app


def test_redirect_to_root(test_app):
    response = test_app.get('/index.html')
    assert response.status_code == 302  # Check if the response is a redirect
    assert response.headers['Location'] == '/'  # Check if it redirects to '/'


def test_nonexistent_route(test_app):
    response = test_app.get('/nonexistent-page')
    assert response.status_code == 302  # Check if the response is a redirect


def test_error_handling(client):
    with app.test_request_context('/error'):
        try:
            app.handle_exception(Exception('Test error'))
        except Exception as e:
            assert e is not None


def test_before_request_https_redirection(client):
    response = client.get('/', headers={'X-Forwarded-Proto': 'http'})
    assert response.status_code == 301
    assert response.headers['Location'].startswith('https://')


def test_before_request_no_https_redirection(client):
    response = client.get('/')
    assert response.status_code == 200


def test_before_request_no_https_redirection_custom_header(client):
    response = client.get('/', headers={'Custom-Header': 'http'})
    assert response.status_code == 200


def test_configure_mail(test_app):
    assert 'MAIL_SERVER' in test_app.application.config
    assert 'MAIL_PORT' in test_app.application.config


def test_initialize_db(test_app):
    with test_app.application.app_context():
        assert 'SQLALCHEMY_DATABASE_URI' in test_app.application.config
        assert test_app.application.config['SQLALCHEMY_DATABASE_URI'] is not None


def test_register_blueprints(test_app):
    blueprints = test_app.application.blueprints
    assert 'user' in blueprints
    assert 'task' in blueprints
    assert 'facebook_auth' in blueprints
    assert 'google_oauth' in blueprints
    # assert 'reloader' in blueprints


def test_index_route_static_file(client):
    response = client.get('/')
    assert response.status_code == 200
    assert b'<!doctype html>' in response.data
