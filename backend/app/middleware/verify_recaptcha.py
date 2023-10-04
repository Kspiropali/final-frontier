import requests
from flask import request, jsonify
from app.config.settings import RECAPTCHA_SECRET_KEY
from functools import wraps


def verify_recaptcha():
    def middleware(route_function):
        @wraps(route_function)
        def captcha_wrapper(*args, **kwargs):
            recaptcha_response = request.json.get("g-recaptcha-response")

            if not recaptcha_response:
                return jsonify({"error": "reCAPTCHA validation failed"}), 400


            response = requests.post(
                    "https://www.google.com/recaptcha/api/siteverify",
                    data={
                        "secret": RECAPTCHA_SECRET_KEY,
                        "response": recaptcha_response,
                    },
                    headers={"Content-Type": "application/x-www-form-urlencoded"},
            )

            response_data = response.json()

            if response_data["success"]:
                return route_function(*args, **kwargs)
            else:
                return jsonify({"error": "reCAPTCHA validation failed"}), 400


        return captcha_wrapper

    return middleware
