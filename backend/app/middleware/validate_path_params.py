from flask import jsonify


def validate_path_params(expected_type):
    def decorator(route_function):
        def wrapper_url(*args, **kwargs):
            id = kwargs.get('id')

            if expected_type == 'string':
                # Check if id is a valid string
                if isinstance(id, str) and id.strip():
                    return route_function(*args, **kwargs)
                else:
                    return jsonify(error='Invalid URL string id'), 400

            elif expected_type == 'int':
                # Check if id is a valid integer
                if str(id).isdigit():
                    return route_function(*args, **kwargs)
                else:
                    return jsonify(error='Invalid URL integer id'), 400

            elif expected_type == 'boolean':
                # Check if id is a valid boolean
                if id in ('true', 'false'):
                    return route_function(*args, **kwargs)
                else:
                    return jsonify(error='Invalid URL boolean id'), 400

            else:
                return jsonify(error='Invalid type parameter'), 400

        return wrapper_url

    return decorator
