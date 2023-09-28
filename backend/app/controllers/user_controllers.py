import bcrypt

from ..models.Email import Email
from ..models.Session import Session
from ..models.User import User
from ..middleware.mailer import send_activation_email, send_password_reset_email
from ..config import DOMAIN

PASSWORD_REGEX = r'^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?!.*\s).{8,}$'


def register_user(username, password, email):
    # Hash password
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode("utf-8"), salt)

    # Create user
    try:
        result = User.create(username, hashed_password.decode("utf-8"), email)

        activation_token = Email.create(username, False)

        send_activation_email(email, DOMAIN + 'users/verify/' + activation_token)

        return result
    except Exception as e:
        return f"error: {str(e)}"


def login_user(username, password):
    try:
        user = User.find_by_username(username)

        if user is None:
            return "error: User not found"

        if not bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
            return "error: Incorrect password"

        if not user.is_activated:
            return "error: User is not activated"

        return "success"

    except Exception as e:
        return f"error: {str(e)}"


def activate_user(email_token):
    try:
        user_email_token = Email.find_by_token(email_token)
        if user_email_token is None:
            return "error: Token not found"

        user_to_activate = User.find_by_username(user_email_token.username)
        if user_to_activate is None:
            return "error: User not found"

        user_result = User.activate_user(user_to_activate.id)
        if user_result is None:
            return "error: Could not activate user"

        email_result = Email.delete(user_email_token.token)
        if email_result is None:
            return "error: Could not delete email token"


        return "success"
    except Exception as e:
        return f"error: Could not activate user: {str(e)}"


def logout_user(token):
    try:
        result = Session.delete(token)

        return result
    except Exception as e:
        return e
