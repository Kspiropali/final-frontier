import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Get environment variables or use defaults
SQLALCHEMY_DATABASE_URI = os.getenv('SQLALCHEMY_DATABASE_URI')
ENV = os.getenv('ENV')
BCRYPT_SALT_ROUNDS = int(os.getenv('BCRYPT_SALT_ROUNDS', 12))
PORT = int(os.getenv('PORT', 8080))
GOOGLE_CLIENT_ID = os.getenv('GOOGLE_CLIENT_ID')
GOOGLE_CLIENT_SECRET = os.getenv('GOOGLE_CLIENT_SECRET')
FACEBOOK_APP_ID = os.getenv('FACEBOOK_APP_ID')
FACEBOOK_APP_SECRET = os.getenv('FACEBOOK_APP_SECRET')
RECAPTCHA_SECRET_KEY = os.getenv('RECAPTCHA_SECRET_KEY')
SECRET_KEY = os.getenv('SECRET_KEY')
DOMAIN = os.getenv('DOMAIN')
MAIL = os.getenv('MAIL')
