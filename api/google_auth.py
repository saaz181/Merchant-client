from requests import post, get
import requests
from .credentials import CLIENT_ID, CLIENT_SECRET, REDIRECT_URI
from .models import GoogleToken
from django.utils import timezone
from datetime import timedelta
import datetime

def get_user_tokens(session_id):
    user_tokens = GoogleToken.objects.filter(user=session_id)

    if user_tokens.exists():
        return user_tokens[0]
    return None


def update_or_create_user_tokens(session_id, access_token, token_type, expires_in, refresh_token):
    tokens = get_user_tokens(session_id)
    expire_in = timezone.now() + timedelta(seconds=expires_in)

    if tokens:
        tokens.access_token = access_token
        tokens.refresh_token = refresh_token
        tokens.expires_in = expire_in
        tokens.token_type = token_type
        tokens.save(update_fields=['access_token', 'refresh_token', 'expires_in', 'token_type'])
    
    else:
        tokens = GoogleToken(
            user=session_id, 
            access_token=access_token, 
            refresh_token=refresh_token, 
            token_type=token_type,
            expires_in=expire_in)
        tokens.save()

def is_authenticated_google(session_id):
    tokens = get_user_tokens(session_id)
    if tokens:
        expiry = tokens.expires_in
        if expiry < timezone.now():
            refresh_google_oauth(session_id)

        return True
    
    return False


def refresh_google_oauth(session_id):
    refresh_token = get_user_tokens(session_id).refresh_token

    response = post('https://oauth2.googleapis.com/token', data={
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET,
        'grant_type': 'refresh_token',
        'refresh_token': refresh_token
    }).json()

    access_token = response.get('access_token')
    expires_in = response.get('expires_in')
    token_type = response.get('token_type')

    update_or_create_user_tokens(
        session_id, 
        access_token,
        token_type, 
        expires_in, 
        refresh_token
    )    

def get_information_from_google(session_id):
    tokens = get_user_tokens(session_id)
    endpoint = 'https://openidconnect.googleapis.com/v1/userinfo'

    headers = {
        'Content-Type': 'application/json', 
        'Authentication': 'Bearer ' + tokens.access_token}
    
    data = {
        'access_token': tokens.access_token
    }

    response = requests.get(endpoint, headers=headers, params=data)

    return response.json()





