from flask import Blueprint, url_for, session, request
from flask_oauthlib.client import OAuth
from ..config.settings import *

google_oauth_bp = Blueprint('google_oauth', __name__)

# Set up OAuth configuration for Google
oauth = OAuth()

google = oauth.remote_app(
    'google',
    consumer_key=GOOGLE_CLIENT_ID,
    consumer_secret=GOOGLE_CLIENT_SECRET,
    request_token_params={
        'scope': 'email',
        'prompt': 'select_account',
        'access_type': 'offline'
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
    response = google.authorized_response()
    if response is None or response.get('access_token') is None:
        return 'Access denied: reason={} error={}'.format(
            request.args['error_reason'],
            request.args['error_description']
        )
    session['google_token'] = (response['access_token'], '')
    user_info = google.get('userinfo')
    return 'Logged in as: ' + user_info.data['email']


# Logout route
@google_oauth_bp.route('/logout')
def logout():
    session.pop('google_token', None)
    return 'Logged out'


# Google OAuth route
@google_oauth_bp.route('/login')
def login():
    return google.authorize(callback=url_for('google_oauth.authorized', _external=True))


@google.tokengetter
def get_google_oauth_token():
    return session.get('google_token')
