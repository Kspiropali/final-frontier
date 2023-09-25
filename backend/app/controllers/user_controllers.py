from ..models.User import User


def get_users():
    users = User.get_users()
    user_list = [{'id': user.id, 'username': user.username} for user in users]
    return user_list


def get_user(user_id):
    user = User.get_user(user_id)
    print(user)
    user_data = {'id': user.id, 'username': user.username}
    return user_data


def create_user(username, password, email):
    print(username, password, email)
    # Error validation
    try:
        result = User.create(username, password, email)

        if result is not "success":
            return result

        return result
    except Exception as e:
        return e


def update_user(user_id, data):
    user = User.query.get_or_404(user_id)
    username = data.get('username', user.username)
    password = data.get('password', user.password)
    user.update(username, password)

    return "ok"


def delete_user(user_id):
    user = User.query.get_or_404(user_id)
    user.delete()

    return "deleted"
