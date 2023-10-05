import bcrypt
import json

from app.models.Email import Email
from app.models.Session import Session
from app.models.User import User
from app.middleware.mailer import send_activation_email, send_password_reset_email
from app.config import DOMAIN

PASSWORD_REGEX = r'^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?!.*\s).{8,}$'


def register_user(username, password, email, is_oauth=False):
    # Hash password
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode("utf-8"), salt)

    # Create user
    try:
        result = User.create(username, hashed_password.decode("utf-8"), email)

        activation_token = Email.create(username, False)

        if not is_oauth:
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

        # create user's member_details info
        result = User.create_member_details(user_to_activate.username)
        print(result)

        return "success"
    except Exception as e:
        return f"error: Could not activate user: {str(e)}"


def logout_user(token):
    try:
        return Session.delete(token)
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
        print(user)
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
        if user is None:
            return "error: User not found"

        result = User.update(user.username, data)
        if result is None:
            return "error: Could not update user"

        return "success"
    except Exception as e:
        return f"error: {str(e)}"


def get_user_basic_details(username):
    try:
        user_details = User.get_user_basic_details(username)
        if user_details is None:
            return "error: User not found"
        return user_details
    except Exception as e:
        return f"error: {str(e)}"
    
def get_tasks(token):
    username = Session.get_username(token)
    user = User.find_by_username(username)
    user_json = jsonify({'user': {'id': user.id, 'email': user.email, 'username': user.username, 'tasks': user.allocated_tasks}})
    user_object = user_json.json
    tasks = user_object['user']['tasks']
    if tasks == []:
        new_tasks = Task.get_tasks()
        task_dicts = [{'id': task.id, 'name': task.name, 'description': task.description, 'duration': task.duration} for task in new_tasks]
        allocated_tasks_json = json.dumps(task_dicts)
        result = User.initialise_tasks(user_object['user']['id'], allocated_tasks_json)
        return result
    latest_session = Session.get_session(token)
    latest_session_str = latest_session.strftime('%Y-%m-%d %H:%M:%S')
    current_date = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    current_date_obj = datetime.strptime(current_date, '%Y-%m-%d %H:%M:%S')
    last_session_obj = datetime.strptime(latest_session_str, '%Y-%m-%d %H:%M:%S')
    time_difference = (current_date_obj - last_session_obj).total_seconds()
    print(time_difference)
    if time_difference > 86400:
        new_tasks = Task.get_tasks()
        task_dicts = [{'id': task.id, 'name': task.name, 'description': task.description, 'duration': task.duration} for task in new_tasks]
        allocated_tasks_json = json.dumps(task_dicts)
        result = User.initialise_tasks(user_object['user']['id'], allocated_tasks_json)
        return user_json
    return user_json

def get_coins_by_user(username):
    try:
        user = User.find_by_username(username)
        if user is None:
            return "error: User not found"
        return user.coins
    except Exception as e:
        return f"error: {str(e)}"