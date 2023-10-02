import os
import time
from glob import glob

from flask import redirect, request
from app.database.db import *
from app.config.settings import Config
from app.routes import user_routes, task_router, profile_router
from app.database import *
from app.middleware.mailer import configure_mail
from app.routes import google_oauth, facebook_oauth, secure_reloader
from flask_cors import CORS


MONITORED_FILES = glob(os.path.join(".", '**'), recursive=True)

# create flask app and declare static folder
app = Flask(__name__, static_folder="static/", static_url_path="/")

# Configure CORS
# TODO: change it later, cookies change domains as well
CORS(app, supports_credentials=True)
cors = CORS(app, resources={r"/*": {"origins": "http://localhost:5173", "supports_credentials": True}})


# configure the mailer
configure_mail(app)

# use the config file
app.config.from_object(Config)
app.secret_key = Config.SECRET_KEY
# Initialize the SQLAlchemy instance
with app.app_context():
    db.initialize_db(app)

# Routes, order matters!
app.register_blueprint(user_routes.user_bp, url_prefix="/users")
app.register_blueprint(task_router.task_bp, url_prefix="/tasks")
app.register_blueprint(facebook_oauth.facebook_auth_bp, url_prefix="/auth/facebook")
app.register_blueprint(google_oauth.google_oauth_bp, url_prefix="/auth/google")
app.register_blueprint(secure_reloader.reload_bp, url_prefix="/admin")
app.register_blueprint(profile_router.profile_bp, url_prefix='/profile')


# Route for the index page
@app.route("/")
def index():
    return app.send_static_file("index.html")


@app.route('/index.html')
def redirect_to_root():
    return redirect('/')


# @app.errorhandler(404)
# def page_not_found(error):
#     return redirect('/')


@app.before_request
def before_request():
    # Check if the incoming request is using HTTP
    if request.headers.get('X-Forwarded-Proto') == 'http':
        # Redirect to the HTTPS version of the URL
        url = request.url.replace('http://', 'https://', 1)
        return redirect(url, code=301)


if __name__ == "__main__":

    with app.app_context():
        setup_tables()
        dummy_data()

    if Config.ENV == 'development':
        os.environ['DOMAIN'] = 'http://localhost:5000/'
        app.run(debug=True, use_reloader=True, host="0.0.0.0", port=5000, extra_files=MONITORED_FILES)
    elif Config.ENV == 'production':
        os.environ['DOMAIN'] = 'http://localhost:8080/'
        # TODO: https and more security headers, possibly gunicorn
        app.run(host="0.0.0.0", port=Config.PORT, use_reloader=True, extra_files=MONITORED_FILES)
    elif Config.ENV == 'local':
        os.environ['DOMAIN'] = 'http://localhost:3000/'


        app.run(debug=True, port=3000, use_reloader=True, host="0.0.0.0", extra_files=MONITORED_FILES)
