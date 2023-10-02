from flask import Blueprint, request, jsonify, make_response, redirect, url_for
from sqlalchemy import CursorResult

from ..controllers.user_controller import *
from ..controllers.statistics_controller import *
from ..middleware.authorization import requires_authorization_token
from ..middleware.validate_json_params import validate_json_params
from ..middleware.validate_path_params import validate_path_params
from ..models.Session import Session

user_bp = Blueprint('user', __name__)


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
                        domain='localhost',  # Common domain
                        path='/')  # Path where the cookie is accessible

        return resp
    except Exception as e:
        return {'error': str(e)}, 400


@user_bp.post('/logout')
@requires_authorization_token()
def logout(token):
    try:
        print(token)
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
                        max_age=0,
                        domain='localhost')

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

        # TODO: return a redirect here instead of a message
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

        return jsonify({'message': 'Password reset successfully'}), 200
    except Exception as e:
        return {'error': str(e)}, 400


@user_bp.post('/reset/<param>')
@validate_path_params('string')
def reset_password(param):
    try:
        result = reset_user_password(param, request.json.get('password'))
        print(result)
        if not isinstance(result, CursorResult) and result.startswith('error'):
            return jsonify({'error': result.split("error: ")[1]}), 400

        return jsonify({'message': 'Password reset successfully'}), 200
    except Exception as e:
        return {'error': str(e)}, 400

@user_bp.get('/statistics')
@requires_authorization_token()
def get_stats(token):
    try:
        username = Session.get_username(token)
        print(username)
        stats = get_stats_by_user(username)
        print(stats)
        return jsonify({'statistics': [{'id': stat.task_id, 'feedback': stat.feedback, 'duration': stat.total_time}] for stat in stats})
    except:
        return "FAILED!"