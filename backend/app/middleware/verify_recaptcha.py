import requests
from flask import request, jsonify

RECAPTCHA_SECRET_KEY = "YOUR_RECAPTCHA_SECRET_KEY"


def verify_recaptcha(next):
    def captcha_wrapper(*args, **kwargs):
        recaptcha_response = request.form.get("g-recaptcha-response")

        if not recaptcha_response:
            return jsonify({"error": "reCAPTCHA validation failed"}), 400

        try:
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
                return next(*args, **kwargs)
            else:
                return jsonify({"error": "reCAPTCHA validation failed"}), 400
        except Exception:
            return jsonify({"error": "reCAPTCHA validation failed"}), 500

    return captcha_wrapper
