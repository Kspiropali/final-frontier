from flask import Blueprint, request, jsonify, make_response, redirect, url_for
from sqlalchemy import CursorResult

from app.controllers.user_controller import *
from app.controllers.statistics_controller import *
from app.controllers.item_controller import *
from app.middleware.authorization import requires_authorization_token
from app.middleware.validate_json_params import validate_json_params
from app.middleware.validate_path_params import validate_path_params
from app.middleware.verify_recaptcha import verify_recaptcha
from app.models.Session import Session
from app.config.settings import DOMAIN

user_bp = Blueprint('user', __name__)


@user_bp.post('/register')
# @verify_recaptcha()
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

        if result.startswith('error'):
            try:
                return jsonify({'error': result.split("DETAIL:")[1].strip().split("\n")[0]}), 400
            except Exception:
                return jsonify({'error': result.split('error: ')[1]}), 400

        token = Session.create(username)
        if token.startswith('error'):
            return jsonify({'error': token.split("DETAIL:")[1].strip().split("\n")[0]}), 400

        # send cookies
        resp = make_response(jsonify({'message': 'User logged in successfully'}), 200)
        resp.set_cookie('Authorization',
                        token,
                        httponly=True,
                        samesite='Strict',  # Set to 'None' for cross-origin
                        secure=True,  # Set to True for HTTPS
                        # domain=DOMAIN,  # Common domain
                        path='/')  # Path where the cookie is accessible

        return resp
    except Exception as e:
        return {'error': str(e)}, 400


@user_bp.post('/logout')
@requires_authorization_token()
def logout(token):
    try:

        result = logout_user(token)

        if result.startswith('error'):
            return jsonify({'error': result.split("DETAIL:")[1].strip().split("\n")[0]}), 400

        # send cookies
        resp = make_response(jsonify({'message': 'User logged out successfully'}), 200)
        resp.set_cookie('Authorization', '',
                        httponly=True,
                        samesite='Lax',
                        secure=True,
                        path='/',
                        max_age=0
                        # domain='localhost'
                        )

        return resp
    except Exception as e:
        return {'error': str(e)}, 400


@user_bp.get('/verify/<param>')
@validate_path_params('string')
def verify(param):
    try:
        result = activate_user(param)

        if not isinstance(result, CursorResult) and result.startswith('error'):
            return jsonify({'error': result.split("error: ")[1]}), 400

        # redirect
        return redirect(url_for('index'))
    except Exception as e:
        return {'error': str(e)}, 400


@user_bp.post('/ping')
@requires_authorization_token()
def ping(token):
    try:
        # find username from token
        username = Session.get_username(token)

        return jsonify({'username': username}), 200
    except Exception as e:
        return {'error': str(e)}, 400


@user_bp.post('/reset')
@validate_json_params({
    'email': {'type': 'stringWithMaxLength', 'maxLength': 50}
})
def reset():
    try:
        data = request.json
        email = data.get('email')

        result = send_reset_password(email)

        if result.startswith('error'):
            return jsonify({'error': result.split("error: ")[1].strip()}), 400

        return jsonify({'message': 'Password reset email sent successfully'}), 200
    except Exception as e:
        return {'error': str(e)}, 400


@user_bp.post('/reset/<param>')
@validate_path_params('string')
def reset_password(param):
    try:
        result = reset_user_password(param, request.json.get('password'))

        if not isinstance(result, CursorResult) and result.startswith('error'):
            return jsonify({'error': result.split("error: ")[1]}), 400

        return jsonify({'message': 'Password reset successfully'}), 200
    except Exception as e:
        return {'error': str(e)}, 400


@user_bp.post('/profile/update')
@requires_authorization_token()
def update_basic_details(token):
    try:
        data = request.json
        username = Session.get_username(token)
        result = update_user_basic_details(username, data)

        if result.startswith('error'):
            return jsonify({'error': result.split("error: ")[1]}), 400

        return jsonify({'message': 'User updated successfully'}), 200
    except Exception as e:
        return {'error': str(e)}, 400


@user_bp.post('/profile')
@requires_authorization_token()
def get_basic_details(token):
    try:
        username = Session.get_username(token)
        result = get_user_basic_details(username)

        if type(result) is str and result.startswith('error'):
            return jsonify({'error': result.split("error: ")[1]}), 400

        profile = {
            "first_name": result.first_name,
            "last_name": result.last_name,
            "alias": result.alias,
            "quote": result.quote,
            "summary": result.summary,
            "gender": result.gender,
            "avatar": result.avatar.tobytes().decode('utf-8')
        }

        return jsonify(profile), 200
    except Exception as e:
        return {'error': str(e)}, 400


@user_bp.get('/statistics')
@requires_authorization_token()
def get_stats(token):
    try:
        username = Session.get_username(token)

        stats = get_stats_by_user(username)

        return jsonify(
            {'statistics': [{'id': stat.task_id, 'feedback': stat.feedback, 'duration': stat.total_time}] for stat in
             stats})
    except:
        return "FAILED!", 400


@user_bp.post('/items')
@requires_authorization_token()
def get_owned_items(token):
    try:
        username = Session.get_username(token)
        item_ids = get_items_by_user(username)

        if item_ids and not item_ids[0]:
            return jsonify({'items': []}), 200

        items_details = get_items_by_arr(item_ids)
        # keys in the item table
        keys = ['id', 'name', 'type', 'description', 'price', 'image']
        # return as parsed dict json
        return jsonify({'items': [dict(zip(keys, item)) for item in items_details]}), 200
    except Exception as e:
        return {'error': str(e)}, 400


@user_bp.post('/coins')
@requires_authorization_token()
def get_coins(token):
    try:
        username = Session.get_username(token)
        coins = get_coins_by_user(username)

        return jsonify({'coins': coins}), 200
    except Exception as e:
        return {'error': str(e)}, 400
