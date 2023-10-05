from flask import Blueprint, request, jsonify

from app.controllers.task_controller import *
from app.middleware.authorization import requires_authorization_token
from app.middleware.validate_json_params import validate_json_params

task_bp = Blueprint('task', __name__)


@task_bp.route('/<int:task_id>', methods=['PATCH'])
def update_single_task(task_id):
    try:
        print(task_id)
        data = request.json
        result = update_task(task_id, data)

        # if result.startswith('error'):
        #     return jsonify({'error': result.split("DETAIL:")[1].strip().split("\n")[0]}), 400

        return jsonify({'message': 'User updated successfully'}), 200
    except Exception as e:
        if str(e).startswith('list index out of range'):
            return jsonify({'error': 'User not found'}), 404
        return {'error': str(e)}, 400

@task_bp.route('/<int:task_id>', methods=['GET'])
def get_one_task(task_id):
    try:
        task = get_task(task_id)
        return jsonify({'task': [{'id': task.id, 'name': task.name, 'description': task.description}]})
    except:
        return "FAILED!"
    
@task_bp.route('/<int:task_id>', methods=['DELETE'])
def delete_one_task(task_id):
    try:
        deleted = delete_task(task_id)
        return deleted
    except:
        return "FAILED!"
    
@task_bp.route('/tasks/<int:id>/complete', methods=['POST'])
def complete_task(id):
  return mark_task_completed(id)