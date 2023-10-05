from flask import Blueprint, request, jsonify
from app.models.Session import Session
from app.models.User import User
from app.controllers.item_controller import *
from app.controllers.item_controller import *
from app.middleware.validate_path_params import validate_path_params
from app.middleware.authorization import requires_authorization_token

item_bp = Blueprint('item', __name__)


@item_bp.post('/all')
@requires_authorization_token()
def get_items(token):
    try:
        items = get_all_items()

        if type(items) is str and items.startswith('error'):
            return jsonify({'error': items.split("error: ")[1]}), 400

        keys = ['id', 'name', 'type', 'description', 'price', 'image']
        serialized_items = []

        for item in items:
            image_data = item.image.tobytes().decode('utf-8')

            serialized_item = dict(zip(keys, item[:-1] + (image_data,)))
            serialized_items.append(serialized_item)

        return jsonify({'items': serialized_items}), 200
    except Exception as e:
        return {'error': str(e)}, 400


@item_bp.post('/<param>')
@requires_authorization_token()
@validate_path_params('int')
def get_one_item(token, param):  # order matters, first requires param and then path_params
    try:
        item = get_item(param)

        if type(item) is str and item.startswith('error'):
            return jsonify({'error': 'Item does not exist'}), 400

        keys = ['id', 'name', 'type', 'description', 'price', 'image']
        serialized_item = dict(zip(keys, item[:-1] + (item.image.tobytes().decode('utf-8'),)))

        return jsonify({'item': serialized_item}), 200
    except Exception as e:
        return jsonify({'error': 'Item does not exist'}), 400


@item_bp.post('/buy/<param>')
@requires_authorization_token()
@validate_path_params('int')
def buy_item(token, param):
    try:
        # get user from session
        username = Session.get_username(token)

        # buy item, param is item_id
        result = buy(username, param)

        if type(result) is str and result.startswith('error'):
            return jsonify({'error': result.split("error: ")[1]}), 400

        return jsonify({'success': 'Item bought successfully'}), 200
    except Exception as e:
        return {'error': str(e)}, 400
