import re
from functools import wraps

from flask import request, jsonify

int_regex = re.compile(r'^[0-9]+$')


def validate_json_params(parameter_types):
    def middleware(route_function):
        @wraps(route_function)
        def wrapper_json(*args, **kwargs):
            body_parameters = request.json

            try:
                for param_name, param_config in parameter_types.items():
                    if param_name not in body_parameters:
                        return jsonify(error=f"{param_name} is required."), 400

                    param_value = body_parameters[param_name]

                    if param_config['type'] == 'boolean' and not isinstance(param_value, bool):
                        return jsonify(error=f"{param_name} should be a boolean."), 400
                    elif param_config['type'] in ['string', 'stringWithMaxLength'] and not isinstance(param_value, str):
                        return jsonify(error=f"{param_name} should be a string."), 400
                    elif param_config['type'] == 'int' and not int_regex.match(param_value):
                        return jsonify(error=f"{param_name} should be a valid integer."), 400
                    elif param_config['type'] == 'positiveInt' and (
                            not int_regex.match(param_value) or int(param_value) <= 0):
                        return jsonify(error=f"{param_name} should be a valid positive integer."), 400
                    elif param_config['type'] == 'stringWithMaxLength' and len(param_value) > param_config['maxLength']:
                        return jsonify(
                            error=f"{param_name} should have a maximum length of {param_config['maxLength']} characters."), 400
                    elif param_config['type'] == 'image' and not param_value.startswith('data:image/'):
                        return jsonify(error=f"{param_name} should be a valid base64 image."), 400

            except Exception:
                return jsonify(error='Invalid JSON format.'), 400

            return route_function(*args, **kwargs)

        return wrapper_json

    return middleware
