import pytest
from unittest.mock import MagicMock, patch
from app.controllers.user_controller import (
    register_user,
    login_user,
    activate_user,
    logout_user,
    send_reset_password,
    reset_user_password,
    update_user_basic_details,
)


@patch('app.models.User')
@patch('app.models.Email')
@patch('app.models.Session')
def test_register_user(mock_user, mock_email, mock_session):
    mock_user.create.return_value = "success"
    mock_email.create.return_value = "activation_token"
    mock_user.find_by_username.return_value = None
    mock_email.find_by_token.return_value = None

    result = register_user("test_user", "password123", "test@example.com")

    assert result.startswith("error:")

@patch('app.models.User')
def test_login_user(mock_user):
    user_instance = MagicMock()
    user_instance.password = "hashed_password"
    user_instance.is_activated = True
    mock_user.find_by_username.return_value = user_instance

    result = login_user("test_user", "password123")

    assert result.startswith("error:")


@patch('app.models.Email')
@patch('app.models.User')
def test_activate_user(mock_user, mock_email):
    mock_email.find_by_token.return_value = MagicMock()
    mock_user.find_by_username.return_value = MagicMock()
    mock_user.activate_user.return_value = "success"
    mock_email.delete.return_value = "success"

    result = activate_user("activation_token")

    assert result.startswith("error:")