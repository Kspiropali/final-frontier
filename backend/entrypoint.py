from flask import redirect
from app.database.db import *
from app.config.settings import Config
from app.routes import user_routes
from app.database import *
from app.routes import google_oauth, facebook_oauth

# create flask app and declare static folder
app = Flask(__name__, static_folder="static/", static_url_path="/")

# use the config file
app.config.from_object(Config)
app.secret_key = Config.SECRET_KEY
# Initialize the SQLAlchemy instance
with app.app_context():
    db.initialize_db(app)

# Routes, order matters!
app.register_blueprint(user_routes.user_bp, url_prefix="/users")
app.register_blueprint(facebook_oauth.facebook_auth_bp, url_prefix="/auth/facebook")
app.register_blueprint(google_oauth.google_oauth_bp, url_prefix="/auth/google")


# Route for the index page
@app.route("/")
def index():
    return app.send_static_file("index.html")


@app.route('/index.html')
def redirect_to_root():
    return redirect('/')


if __name__ == "__main__":
    if Config.ENV == 'development':
        app.run(debug=True, host="0.0.0.0", port=5000)
    elif Config.ENV == 'production':
        # TODO: https and more security headers, possibly gunicorn
        app.run(host="0.0.0.0", port=Config.PORT)
    elif Config.ENV == 'local':
        with app.app_context():
            setup_tables()
            dummy_data()

        app.run(debug=True, port=8080)

