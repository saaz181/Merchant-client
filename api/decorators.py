from .google_auth import is_authenticated_google
from rest_framework.response import Response
from rest_framework import status

def is_logged_in(func):
    def wrapper_is_logged_in(request, *args, **kwargs):
        if is_authenticated_google(request.session.session_key):
            return func(*args, **kwargs)
        else:
            return Response({'Unauthorized Request': 'You are not allowed to Create Product'}, status=status.HTTP_401_UNAUTHORIZED)
    
    return wrapper_is_logged_in