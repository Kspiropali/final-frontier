from functools import wraps

from flask import request, make_response, jsonify

from ..models.Session import Session


def requires_authorization_token():
    def middleware(func):
        @wraps(func)
        def decorated_function(*args, **kwargs):
            token = request.cookies.get('Authorization')
            if not token:
                return make_response(jsonify({"error": "Unauthorized"}), 401)

            # check if token is valid
            if not Session.check_token_exists(token):
                return make_response(jsonify({"error": "Unauthorized"}), 401)

            # Send the token to the next route
            return func(token, *args, **kwargs)

        return decorated_function

    return middleware
