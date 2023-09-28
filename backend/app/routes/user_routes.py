from flask import Blueprint, request, jsonify
from ..controllers.user_controllers import *
from ..middleware.validate_json_params import validate_json_params

user_bp = Blueprint('user', __name__)


############## User Routes Reference ##############
@user_bp.route('/', methods=['GET'])
def list_users():
    return jsonify(get_users()), 200
#
#
# @user_bp.route('/<int:user_id>', methods=['GET'])
# def get_single_user(user_id):
#     return jsonify(get_user(user_id))


# @user_bp.route('/', methods=['POST'])
# @validate_json_params({
#     'username': {'type': 'stringWithMaxLength', 'maxLength': 50},
#     'password': {'type': 'stringWithMaxLength', 'maxLength': 50},
#     'email': {'type': 'stringWithMaxLength', 'maxLength': 50}
# })
# def add_user():
#     try:
#         data = request.json
#         username = data.get('username')
#         password = data.get('password')
#         email = data.get('email')
#
#         result = 1
#         if result.startswith('error'):
#             return jsonify({'error': result.split("DETAIL:")[1].strip().split("\n")[0]}), 400
#
#         return jsonify({'message': 'User created successfully'}), 201
#     except Exception as e:
#         return {'error': str(e)}, 400


# @user_bp.route('/<int:id>', methods=['PUT'])
# @validate_path_params('int')
# def update_single_user(id):
#     try:
#         data = request.json
#         result = update_user(id, data)
#
#         if result.startswith('error'):
#             return jsonify({'error': result.split("DETAIL:")[1].strip().split("\n")[0]}), 400
#
#         return jsonify({'message': 'User updated successfully'}), 200
#     except Exception as e:
#         if str(e).startswith('list index out of range'):
#             return jsonify({'error': 'User not found'}), 404
#         return {'error': str(e)}, 400
#
#
# @user_bp.route('/<int:user_id>', methods=['DELETE'])
# def remove_user(user_id):
#     delete_user(user_id)
#     return jsonify({'message': 'User deleted successfully'})


@user_bp.post('/register')
@validate_json_params({
    'username': {'type': 'stringWithMaxLength', 'maxLength': 50},
    'password': {'type': 'stringWithMaxLength', 'maxLength': 50},
    'email': {'type': 'stringWithMaxLength', 'maxLength': 50}
})
def register():
    try:
        data = request.json
        username = data.get('username')
        password = data.get('password')
        email = data.get('email')

        result = register_user(username, password, email)

        if result.startswith('error'):
            return jsonify({'error': result.split("DETAIL:")[1].strip().split("\n")[0]}), 400

        return jsonify({'message': 'User created successfully'}), 201
    except Exception as e:
        return {'error': str(e)}, 400


@user_bp.post('/login')
@validate_json_params({
    'username': {'type': 'stringWithMaxLength', 'maxLength': 50},
    'password': {'type': 'stringWithMaxLength', 'maxLength': 50}
})
def login():
    try:
        data = request.json
        username = data.get('username')
        password = data.get('password')

        result = login_user(username, password)

        print(result)
        if result.startswith('error'):
            try:
                return jsonify({'error': result.split("DETAIL:")[1].strip().split("\n")[0]}), 400
            except Exception:
                return jsonify({'error': result.split('error: ')[1]}), 400

        return jsonify({'message': 'User logged in successfully'}), 200
    except Exception as e:
        return {'error': str(e)}, 400
