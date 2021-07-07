from .credentials import *
from requests import post
from api.models import User


def verify_payment(idx, order_id):
    url = "https://api.idpay.ir/v1.1/payment/verify"
    headers = {
        'Content-Type': 'application/json',
        'X-API-KEY': API_KEY,
        'X-SANDBOX': '1'
    }

    params = {
        'id': idx,
        'order_id': order_id
    }

    response = post(url, headers=headers, json=params).json()
    if 'error_code' in response:
        return False
    
    return True




    