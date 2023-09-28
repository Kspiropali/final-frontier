from flask import Blueprint, request, jsonify
from ..controllers.task_controlller import *
from ..middleware.validate_json_params import validate_json_params

task_bp = Blueprint('task', __name__)

@task_bp.route('/', methods=['GET'])
def list_tasks():
    tasks = get_tasks()
    print(task for task in tasks)
    return jsonify({'tasks': [{'id': task.id, 'name': task.name, 'description': task.description} for task in tasks]})

@task_bp.route('/<int:task_id>', methods=['PATCH'])
def update_single_task(task_id):
    try:
        print(task_id)
        data = request.json
        result = update_task(task_id, data)

        if result.startswith('error'):
            return jsonify({'error': result.split("DETAIL:")[1].strip().split("\n")[0]}), 400

        return jsonify({'message': 'User updated successfully'}), 200
    except Exception as e:
        if str(e).startswith('list index out of range'):
            return jsonify({'error': 'User not found'}), 404
        return {'error': str(e)}, 400