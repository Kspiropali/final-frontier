import os

from app import app

from app.database.db import setup_tables, dummy_data
from app.config.settings import Config
from app import MONITORED_FILES

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