import pytest
from flask import Flask, jsonify

from app.middleware.validate_json_params import validate_json_params

app = Flask(__name__)


@pytest.fixture
def client():
    return app.test_client()


# Sample route using the decorator
@app.route('/example', methods=['POST'])
@validate_json_params({'param1': {'type': 'string'}, 'param2': {'type': 'int'}})
def example_route():
    return jsonify(success=True)


# Test cases
def test_valid_json_params(client):
    response = client.post('/example', json={'param1': 'test', 'param2': 123})
    assert response.status_code == 400


def test_missing_required_param(client):
    response = client.post('/example', json={'param2': 123})
    assert response.status_code == 400
    assert response.json == {"error": "param1 is required."}


def test_invalid_param_type(client):
    response = client.post('/example', json={'param1': 'test', 'param2': 'invalid'})
    assert response.status_code == 400
    assert response.json == {"error": "param2 should be a valid integer."}


def test_invalid_json_format(client):
    response = client.post('/example', data='invalid_json', content_type='application/json')
    assert response.status_code == 400


def test_string_exceeds_max_length(client):
    response = client.post('/example', json={'param1': 'toolongstring', 'param2': 123})
    assert response.status_code == 400


def test_invalid_image_format(client):
    response = client.post('/example', json={'param1': 'image', 'param2': 123})
    assert response.status_code == 400
