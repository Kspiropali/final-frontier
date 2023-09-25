from flask import Blueprint, request, jsonify
from ..controllers.user_controllers import *

user_bp = Blueprint('user', __name__)


@user_bp.route('/users', methods=['GET'])
def list_users():
    return jsonify(get_users()), 200


@user_bp.route('/users/<int:user_id>', methods=['GET'])
def get_single_user(user_id):
    return jsonify(get_user(user_id))


@user_bp.route('/users', methods=['POST'])
def add_user():
    try:
        # TODO: Add validation
        data = request.json
        username = data.get('username')
        password = data.get('password')
        email = data.get('email')

        user = create_user(email, username, password)
    #     check if user already exists
        if user is None:
            return {'message': 'User already exists'}, 400

        return jsonify({'message': 'User created successfully', 'id': user.id}), 201
    except Exception as e:
        return {'message': str(e)}, 400


@user_bp.route('/users/<int:user_id>', methods=['PUT'])
def update_single_user(user_id):
    data = request.json
    update_user(user_id, data)
    return jsonify({'message': 'User updated successfully'})


@user_bp.route('/users/<int:user_id>', methods=['DELETE'])
def remove_user(user_id):
    delete_user(user_id)
    return jsonify({'message': 'User deleted successfully'})
