import bcrypt
from ..models.User import User

PASSWORD_REGEX = r'^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?!.*\s).{8,}$'

# User controller reference methods
# def get_users():
#     users = User.get_users()
#     user_list = [{'id': user.id, 'username': user.username} for user in users]
#     return user_list
#
#
# def get_user(user_id):
#     user = User.get_user(user_id)
#
#     user_data = {'id': user.id, 'username': user.username}
#     return user_data
#
#
# def create_user(username, password, email):
#     return User.create(username, password, email)
#
#
# def update_user(user_id, data):
#     return User.update(user_id, data)
#
#
# def delete_user(user_id):
#     User.delete(user_id)
#
#     return "deleted"


def register_user(username, password, email):
    # Hash password
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
    print(password, hashed_password)

    # Create user
    try:
        result = User.create(username, hashed_password, email)

        #     TODO: activation url & send email to user

        return result
    except Exception as e:
        return f"error: {str(e)}"


def login_user(username, password):
    try:
        user = User.find_by_username(username)

        if user is None:
            return "error: User not found"

        if not user.is_activated:
            return "error: User is not active"

        if not bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
            return "error: Incorrect password"

        return "success"

    except Exception as e:
        return f"error: {str(e)}"

