import pytest
from datetime import datetime, timedelta
from app.models.Email import Email
from app.models.User import User
from app import app


@pytest.fixture
def email():
    # Setup: Create an email record for testing
    username = "test_user"
    is_reset = False
    with app.app_context():
        token = Email.create(username, is_reset)
        yield Email.find_by_token(token)

    # Teardown: Delete the email record after testing
    with app.app_context():
        Email.delete(token)

def test_constructor():
    email = Email(1, "test_user", "test_token", False, datetime.now(), datetime.now() + timedelta(days=1))
    assert email.id == 1
    assert email.username == "test_user"
    assert email.token == "test_token"
    assert email.is_reset == False
    assert email.created_at is not None
    assert email.expires_at is not None


def test_create_email():
    username = "test_user"
    is_reset = False
    with app.app_context():
        User.create("test_user", "asdsad", "asdasd")
        token = Email.create(username, is_reset)
        print(token)
        assert token.startswith("")


def test_delete_email(email):
    with app.app_context():
        result = Email.delete(email.token)
        print(result)
        assert result == "success"


def test_find_by_token(email):
    with app.app_context():
        found_email = Email.find_by_token(email.token)
        assert found_email is not None
        assert found_email.token == email.token


def test_delete_all_by_username(email):
    with app.app_context():
        result = Email.delete_all_by_username(email.username)
        assert result == "success"
