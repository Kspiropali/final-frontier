from flask import Blueprint, request, jsonify
from ..controllers.item_controller import *
from ..middleware.validate_json_params import validate_json_params

item_bp = Blueprint('item', __name__)

# Route to fetch all items
@item_bp.route('/', methods=['GET'])
def list_items():
    items = get_items()
    print(item for item in items)
    return jsonify({'items': [{'id': item.id, 'name': item.name, 'type': item.type, 'description': item.description, 'price': item.price, 'image': item.image} for item in items]})

# Route to fetch details of a specific item
@item_bp.route('/<int:item_id>', methods=['GET'])
def get_one_item(item_id):
    try:
        item = get_item(item_id)
        return jsonify({'items': [{'id': item.id, 'name': item.name, 'type': item.type, 'description': item.description, 'price': item.price, 'image': item.image}]})
    except:
        return "FAILED!"