from django.shortcuts import redirect
from requests import post
import requests
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from api.google_auth import is_authenticated_google
from .models import generate_order_id
from .credentials import *
from .utils import verify_payment
from api.models import User, UserCart
from django.views.decorators.csrf import csrf_exempt

class GetPaymentUrl(APIView):
    def get(self, request, format=None):
        if is_authenticated_google(self.request.session.session_key):
            username = request.session.get('email')
            user = User.objects.get(username=username)

            order_id = generate_order_id()
            amount = user.get_total()
            full_name = user.shipping_address.first_name + ' ' + user.shipping_address.last_name
            mail = username
            phone = user.shipping_address.phone
            description = user.get_description_for_payment()

            url_endpoint = "https://api.idpay.ir/v1.1/payment"
            data = {
                "order_id": order_id,
                "amount": int(amount),
                "name": full_name,
                "phone": str(phone),
                "mail": mail,
                "desc": description,
                "callback": CALLBACK
            }
            

            headers = {
                'Content-Type' : 'application/json',
                'X-API-KEY': API_KEY,
                'X-SANDBOX': 'true'
            }

            response = post(url=url_endpoint, headers=headers, json=data).json()
            
            if 'error_code' in response:
                return Response({'Error': 'Payment Not created'}, status=status.HTTP_204_NO_CONTENT)
            
            payment_id = response.get('id')
            payment_link = response.get('link')

            new_order = PaymentId(username=username, 
                                order_id=order_id, 
                                payment_id=payment_id, 
                                payment_link=payment_link)
            new_order.save()

            return Response({'link': payment_link}, status=status.HTTP_200_OK)


        return Response({"Unauthorized Request": 'You are not allowed'}, status=status.HTTP_401_UNAUTHORIZED)

@csrf_exempt
def idpay_callback(request, format=None):
    credit_card = request.POST.get('card_no')
    date = request.POST.get('data')
    amount = request.POST.get('amount')
    track_id = request.POST.get('track_id')
    order_id = request.POST.get('order_id')
    id = request.POST.get('id')

    verified_payment = verify_payment(id, order_id)

    if verified_payment:
        order = PaymentId.objects.filter(order_id=order_id)
        order.update(track_id=track_id)
        user = PaymentId.objects.filter(order_id=order_id)
        if user.exists():
            username = user[0].username
            user_cart = UserCart.objects.filter(username=username, ordered=False)
            user_cart.update(ordered=True)

        print('VERIFIED')    
        return redirect('/')

    print('NOT VERIFIED')
    return redirect('/')





