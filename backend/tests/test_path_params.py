import pytest
from flask import Flask, jsonify

from app.middleware.validate_path_params import validate_path_params

app = Flask(__name__)

@pytest.fixture
def client():
    return app.test_client()

# Sample route using the decorator
@app.route('/example/<param>', methods=['GET'])
@validate_path_params('string')
def example_route_string(param):
    return jsonify(success=True)

@app.route('/example_int/<param>', methods=['GET'])
@validate_path_params('int')
def example_route_int(param):
    return jsonify(success=True)

@app.route('/example_boolean/<param>', methods=['GET'])
@validate_path_params('boolean')
def example_route_boolean(param):
    return jsonify(success=True)

# Test cases
def test_valid_string_param(client):
    response = client.get('/example/test')
    assert response.status_code == 200
    assert response.json == {"success": True}

def test_invalid_string_param(client):
    response = client.get('/example/')
    assert response.status_code == 404

def test_valid_int_param(client):
    response = client.get('/example_int/123')
    assert response.status_code == 200
    assert response.json == {"success": True}

def test_invalid_int_param(client):
    response = client.get('/example_int/abc')
    assert response.status_code == 400

def test_valid_boolean_param(client):
    response = client.get('/example_boolean/true')
    assert response.status_code == 500

def test_invalid_boolean_param(client):
    response = client.get('/example_boolean/invalid')
    assert response.status_code == 400

def test_invalid_type_param(client):
    response = client.get('/example/param')
    assert response.status_code == 200