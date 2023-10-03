from flask import Blueprint, url_for, session, request, redirect, make_response
from flask_oauthlib.client import OAuth
from app.config.settings import *
from app.models.User import User
from app.models.Session import Session
from app.controllers.user_controller import register_user
from app.config.settings import DOMAIN

google_oauth_bp = Blueprint('google_oauth', __name__)

# Set up OAuth configuration for Google
oauth = OAuth()
data = 0
token = 0

google = oauth.remote_app(
    'google',
    consumer_key=GOOGLE_CLIENT_ID,
    consumer_secret=GOOGLE_CLIENT_SECRET,
    request_token_params={
        'scope': 'email',
    },
    base_url='https://www.googleapis.com/oauth2/v1/',
    request_token_url=None,
    access_token_method='POST',
    access_token_url='https://accounts.google.com/o/oauth2/token',
    authorize_url='https://accounts.google.com/o/oauth2/auth',
)


# OAuth callback route
@google_oauth_bp.route('/callback')
def authorized():
    global data, token

    response = google.authorized_response()
    if response is None or response.get('access_token') is None:
        return 'Access denied: reason={} error={}'.format(
            request.args['error_reason'],
            request.args['error_description']
        )

    token = response
    user_info = google.get('userinfo')
    data = user_info.data

    # try to find user from db by email
    found_user = User.find_by_email(data['email'])
    if found_user:
        # if user exists, update google_id
        print("User exists")

        # delete all sessions for this user
        Session.delete_all_sessions(found_user.id + "_google")
    else:
        # user does not exist, create new user
        print("User does not exist")

        # register new google user
        register_user(data['id'] + "_google", token["access_token"], data['email'])

        # activate user manually, could be better way
        User.activate_by_email(data['email'])

    # create new session cookie
    user_local_token = Session.create(data['id'] + "_google")

    # reset global variable access_token
    token = 0

    resp = make_response(redirect('/'), 302)
    resp.set_cookie('Authorization',
                    user_local_token,
                    httponly=True,
                    samesite='Strict',  # Set to 'None' for cross-origin
                    secure=True,  # Set to True for HTTPS
                    domain=DOMAIN,  # Common domain
                    path='/')  # Path where the cookie is accessible

    # return cookie and redirect as well
    return resp


# Google OAuth route
@google_oauth_bp.route('/login')
def login():
    # print the url for google_oauth.authorized
    print(url_for('google_oauth.authorized', _external=True))

    return google.authorize(callback=url_for('google_oauth.authorized', _external=True))


@google.tokengetter
def get_google_oauth_token():
    global token
    return token
