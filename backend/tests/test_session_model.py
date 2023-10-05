import pytest
from unittest.mock import patch, MagicMock
from app.models.Session import Session
from app import app
from app.models.User import User


@patch('app.database.db')
def test_create_session(mock_db):
    mock_engine = mock_db.engine
    mock_conn = mock_engine.connect.return_value.__enter__.return_value
    mock_result = MagicMock()
    mock_conn.execute.return_value = mock_result
    mock_result.rowcount = 1

    result = Session.create("test_user")

    assert result != "error: Session not created"


def test_create_session_by_manual():
    with app.app_context():
        User.create("test_use1r", "test_password1", "test_email1")
        result = Session.create("test_user")

        assert result != "error: Session not created"


def test_delete_session_by_manual():
    with app.app_context():
        User.create("test_use1r", "test_password1", "test_email1")
        Session.create("test_user")
        result = Session.delete("test_token")

        assert result == 'error: Session not deleted'


@patch('app.database.db')
def test_delete_session(mock_db):
    mock_engine = mock_db.engine
    mock_conn = mock_engine.connect.return_value.__enter__.return_value
    mock_result = MagicMock()
    mock_conn.execute.return_value = mock_result
    mock_result.rowcount = 1

    result = Session.delete("test_token")

    assert result != "success"


@patch('app.database.db')
def test_check_token_exists(mock_db):
    with app.app_context():
        mock_engine = mock_db.engine
        mock_conn = mock_engine.connect.return_value.__enter__.return_value
        mock_result = MagicMock()
        mock_conn.execute.return_value = mock_result
        mock_result.rowcount = 1

        result = Session.check_token_exists("test_token")

        assert result is False


def test_get_username_by_manual():
    with app.app_context():
        User.create("test_user1", "test_password1", "test_email1")
        user = Session.create("test_user1")
        result = Session.get_username("test_user1")

        assert result == 'error: Session not found'


def test_delete_all_by_username():
    with app.app_context():
        Session.delete_all_sessions("test_user1")

        assert True


@patch('app.database.db')
def test_get_username(mock_db):
    mock_engine = mock_db.engine
    mock_conn = mock_engine.connect.return_value.__enter__.return_value
    mock_result = MagicMock()
    mock_conn.execute.return_value = mock_result
    mock_result.rowcount = 1
    mock_result.fetchone.return_value = ("test_user",)

    result = Session.get_username("test_token")

    assert result != "test_user"
