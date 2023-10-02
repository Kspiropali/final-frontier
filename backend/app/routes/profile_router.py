from flask import Blueprint, request, jsonify
from ..models.User import User

user_api_bp = Blueprint('profile', __name__)

@user_api_bp.route('/profile/<int:user_id>', methods=['GET'])
def get_user_data(user_id):
    try:
        user = User.get_user(user_id)
        if user:
            user_data = {
                'id': user.id,
                'email': user.email,
                'username': user.username,
                'coins': user.coins,
                'avatar': user.avatar,
                'last_logged': user.last_logged,
                'items': user.items,
                'ongoing_task': user.ongoing_task,
                'allocated_tasks': user.allocated_tasks,
                'is_activated': user.is_activated
            }
            return jsonify(user_data), 200
        else:
            return jsonify({'error': 'User not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500
