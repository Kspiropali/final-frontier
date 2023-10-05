from flask import Blueprint, redirect, url_for, request, session
from flask_oauthlib.client import OAuth
from app.config.settings import *

facebook_auth_bp = Blueprint('facebook_auth', __name__)

# Configure Facebook OAuth
oauth = OAuth()

facebook = oauth.remote_app(
    'facebook',
    consumer_key=FACEBOOK_APP_ID,
    consumer_secret=FACEBOOK_APP_SECRET,
    request_token_params={'scope': 'email'},
    base_url='https://graph.facebook.com/',
    request_token_url=None,
    access_token_method='GET',
    access_token_url='/oauth/access_token',
    authorize_url='https://www.facebook.com/dialog/oauth',
)


# OAuth callback route
@facebook_auth_bp.route('/callback')
def authorized():
    response = facebook.authorized_response()
    if response is None or response.get('access_token') is None:
        return 'Access denied: reason={} error={}'.format(
            request.args['error_reason'],
            request.args['error_description']
        )

    # TODO: dont forget to use DOMAIN for cookies
    session['facebook_token'] = (response['access_token'], '')
    user_info = facebook.get('userinfo')
    return 'Logged in as: ' + user_info.data['email']


# Logout route
@facebook_auth_bp.route('/logout')
def logout():
    session.pop('facebook_token', None)
    return 'Logged out'


# Facebook OAuth route
@facebook_auth_bp.route('/login')
def login():
    return facebook.authorize(callback=url_for('facebook_auth.authorized', _external=True))


@facebook.tokengetter
def get_facebook_oauth_token():
    return session.get('facebook_token')

