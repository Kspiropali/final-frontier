from . import *


class Config:
    # database
    SQLALCHEMY_DATABASE_URI = SQLALCHEMY_DATABASE_URI
    # flask mode & port
    ENV = ENV
    PORT = PORT
    # secret key
    BCRYPT_SALT_ROUNDS = BCRYPT_SALT_ROUNDS
    # google 0auth
    GOOGLE_CLIENT_ID = GOOGLE_CLIENT_ID
    GOOGLE_CLIENT_SECRET = GOOGLE_CLIENT_SECRET
    # facebook 0auth
    FACEBOOK_APP_ID = FACEBOOK_APP_ID
    FACEBOOK_APP_SECRET = FACEBOOK_APP_SECRET
    # recaptcha
    RECAPTCHA_SECRET_KEY = RECAPTCHA_SECRET_KEY
    # secret key
    SECRET_KEY = SECRET_KEY
    # domain of the deployed app
    DOMAIN = DOMAIN
    # mail stuff
    MAIL = MAIL
    MAIL_USERNAME = MAIL_USERNAME
    MAIL_PASSWORD = MAIL_PASSWORD
    MAIL_RECIPIENT = MAIL_RECIPIENT
