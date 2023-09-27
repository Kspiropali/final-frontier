from flask import Flask, redirect

from app.database.db import setup_tables
from config.settings import Config
from app.routes import user_routes
from app.database import db

# create flask app and declare static folder
app = Flask(__name__, static_folder="static/", static_url_path="/")

# use the config file
app.config.from_object(Config)

# Initialize the SQLAlchemy instance
with app.app_context():
    db.initialize_db(app)

# Routes, order matters!
app.register_blueprint(user_routes.user_bp)


# Route for the index page
@app.route("/")
def index():
    return app.send_static_file("index.html")


@app.route('/index.html')
def redirect_to_root():
    return redirect('/')


if __name__ == "__main__":
    if Config.ENV == 'development':
        with app.app_context():
            setup_tables()
        app.run(debug=True, host="0.0.0.0", port=5000)
    else:
        app.run(host="0.0.0.0", port=Config.PORT)
