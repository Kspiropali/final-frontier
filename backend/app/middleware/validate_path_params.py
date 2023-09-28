from functools import wraps

from flask import jsonify


# Note: consumes <param> in routes, so we need to pass it as a parameter
# Note: should always use /<param> in routes
def validate_path_params(expected_type):
    def middleware(route_function):
        @wraps(route_function)
        def wrapper_url(*args, **kwargs):
            param = kwargs.get('param')

            if expected_type == 'string':
                # Check if id is a valid string
                if isinstance(param, str) and param.strip():
                    return route_function(*args, **kwargs)
                else:
                    return jsonify(error='Invalid URL string id'), 400

            elif expected_type == 'int':
                # Check if id is a valid integer
                if str(param).isdigit():
                    return route_function(*args, **kwargs)
                else:
                    return jsonify(error='Invalid URL integer id'), 400

            elif expected_type == 'boolean':
                # Check if id is a valid boolean
                if param in ('true', 'false'):
                    return route_function(param, *args, **kwargs)
                else:
                    return jsonify(error='Invalid URL boolean id'), 400

            else:
                return jsonify(error='Invalid type parameter'), 400

        return wrapper_url

    return middleware
