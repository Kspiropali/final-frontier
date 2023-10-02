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


def send_reset_password(email):
    try:
        # try to find the user
        user = User.find_by_email(email)
        if user is None:
            return "error: User not found"

        # if user is not activated, return error
        if not user.is_activated:
            return "error: User is not activated"

        # delete all previous emails for this user
        Email.delete_all_by_username(user.username)

        # create a new email
        token = Email.create(user.username, True)

        # send the email
        send_password_reset_email(email, DOMAIN + "?token=" + token)

        return "success"
    except Exception as e:
        return f"error: {str(e)}"


def reset_user_password(email_token, new_password):
    try:
        if not new_password:
            return "error: Password cannot be empty"

        # find the email
        email = Email.find_by_token(email_token)
        if email is None:
            return "error: Token is invalid"

        # find the user
        user = User.find_by_username(email.username)
        if user is None:
            return "error: User not found"
        print( user)
        # hash the new password
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(new_password.encode("utf-8"), salt)

        # update the user
        result = User.update_password(user.id, hashed_password.decode("utf-8"))
        print(result)
        # delete the email
        Email.delete(email_token)

        return result
    except Exception as e:
        return f"error: {str(e)}"


def update_user_basic_details(username, data):
    try:
        user = User.find_by_username(username)
        table_elements = ['first_name', 'last_name', 'alias', 'quote', 'summary', 'gender', 'avatar']

        for element in table_elements:
            if data.get(element):
                user[element] = data.get(element)

        result = User.update(user)

        return result
    except Exception as e:
        return f"error: {str(e)}"
