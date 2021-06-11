import requests
from requests.api import post
from rest_framework.response import Response
from rest_framework.views import APIView
from api.models import Merchant
from django.shortcuts import redirect, render
from rest_framework import serializers, status, generics
from .models import Merchant, Products
from .serializers import *
from validate_email import validate_email
from rest_framework.decorators import api_view
from rest_framework.parsers import MultiPartParser
from .google_auth import is_authenticated_google, update_or_create_user_tokens
from requests import Request
from .credentials import *
import hashlib
import os

@api_view(['GET'])
def email_validator(request, email=None, *args, **kwargs):
    if request.method == 'GET':
        if email:
            is_valid = validate_email(email)
            if is_valid:
                return Response({'is_valid': True}, status=status.HTTP_204_NO_CONTENT)

            return Response({'is_valid': False}, status=status.HTTP_204_NO_CONTENT)

        return Response({'Message': 'Bad Request'}, status=status.HTTP_400_BAD_REQUEST)



class MerchantView(generics.CreateAPIView):
    queryset = Merchant.objects.all()
    serializer_class = MerchantSerializer


class ProductView(generics.CreateAPIView):
    queryset = Products.objects.all()
    serializer_class = ProductSerializer


class CreateMerchantView(APIView):
    serializer_class = CreateMerchantSerializer
    parser_classes = (MultiPartParser,)

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        
        if serializer.is_valid():
            merchant_session = self.request.session.session_key
            name = serializer.validated_data.get('name')
            address = serializer.validated_data.get('address')
            first_name = serializer.validated_data.get('first_name')
            last_name = serializer.validated_data.get('last_name')
            phone = serializer.validated_data.get('phone')
            merchant_logo = serializer.validated_data.get('merchant_logo')
            country = serializer.validated_data.get('country')
            province = serializer.validated_data.get('province')
            city = serializer.validated_data.get('city')
            email = serializer.validated_data.get('email')
            is_merchant = serializer.validated_data.get('is_merchant')
            credit_card = serializer.validated_data.get('credit_card')
            shaba_code = serializer.validated_data.get('shaba_code')
            

            merchant = Merchant(merchant_session=merchant_session, 
                                name=name, 
                                address=address, 
                                first_name=first_name, 
                                last_name=last_name, 
                                phone=phone,
                                merchant_logo=merchant_logo,
                                country=country, 
                                province=province,
                                city=city, 
                                email=email, 
                                is_merchant=is_merchant, 
                                credit_card=credit_card, 
                                shaba_code=shaba_code)
                                
            
            merchant.save()        
            self.request.session['merchant_id'] = merchant.merchant_id
            return Response(MerchantSerializer(merchant).data, status=status.HTTP_201_CREATED)
        
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            


class GetMerchantInfo(APIView):
    serializer_class = MerchantSerializer
    lookup_url_kwarg = 'id'

    def get(self, request, format=None):
        merchant_id = request.GET.get(self.lookup_url_kwarg)
        if merchant_id != None:
            merchant = Merchant.objects.filter(merchant_id=merchant_id)
            if merchant.exists():
                if request.session.get('merchant_id') == merchant_id:
                    data = MainMerchantPageSerializer(merchant[0]).data
                    return Response(data, status=status.HTTP_200_OK)
                
                else:
                    return Response({'Unauthorized Request': 'You are not authorized'}, status=status.HTTP_401_UNAUTHORIZED)
            else:
                return Response({'Error': "Merchant Not found or request isn't from merchant"}, status=status.HTTP_400_BAD_REQUEST)
        
        return Response({'Bad Request': "merchant ID not found in request"}, status=status.HTTP_400_BAD_REQUEST)
        



class CreateProductView(APIView):
    serializer_class = CreateProductSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            merchant_id = serializer.data.get('merchant_id')
            product_name = serializer.data.get('product_name')
            product_description = serializer.data.get('product_description')
            product_image = serializer.data.get('product_image')
            price = serializer.data.get('price')
            quantity = serializer.data.get('quantity')
            off = serializer.data.get('off')
            visited_time = serializer.data.get('visited_time')
            purchased_time = serializer.data.get('purchased_time')

            queryset = Products.objects.filter(merchant_id=merchant_id, product_name=product_name)
            if queryset.exists():
                return Response({'Message': 'Duplicate Error'}, status=status.HTTP_400_BAD_REQUEST)
            
            else:
                product = Products(merchant_id=merchant_id, 
                                product_name=product_name, 
                                product_description=product_description, 
                                product_image=product_image, 
                                price=price, 
                                quantity=quantity, 
                                off=off, 
                                visited_time=visited_time, 
                                purchased_time=purchased_time)
                product.save()

                return Response(CreateProductSerializer(product).data, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)
        



class AuthURL(APIView):
    
    def get(self, request, format=None):
        url_endpoint = 'https://accounts.google.com/o/oauth2/v2/auth'
        state = hashlib.sha256(os.urandom(1024)).hexdigest()
        self.request.session['state'] = state
        scope = 'openid email'
        data = {
            'scope': scope,
            'access_type': 'offline',
            'include_granted_scopes': 'true',
            'response_type': 'code',
            'state': state,
            'redirect_uri': REDIRECT_URI,
            'client_id': CLIENT_ID,
            'prompt': 'consent'

        }
        url = Request('GET', url_endpoint, params=data).prepare().url

        return Response({'url': url}, status=status.HTTP_200_OK)

def google_callback(request, format=None):
    code = request.GET.get('code')
    state = request.GET.get('state')
    error = request.GET.get('error')
    if state != request.session['state']:
        print('------------- NOT AUTHORIZED ACCESS -------------')
        return redirect('frontend:') 

    response = post('https://oauth2.googleapis.com/token', params={
        'client_id': CLIENT_ID, 
        'client_secret': CLIENT_SECRET,
        'code': code,
        'grant_type': 'authorization_code',
        'redirect_uri': REDIRECT_URI,
    }).json()

    # print(response.text)
    access_token = response.get('access_token')
    expires_in = response.get('expires_in')
    refresh_token = response.get('refresh_token')
    token_type = response.get('token_type')

    # if an error occurred during the call to oAuth2 api
    error = response.get('error')


    if not request.session.exists(request.session.session_key):
        request.session.create()

    update_or_create_user_tokens(
        request.session.session_key,
        access_token,
        token_type,
        expires_in,
        refresh_token
    )

    return redirect('frontend:')

        
class IsAuthenticated(APIView):
    def get(self, request, format=None):
        is_authenticated = is_authenticated_google(self.request.session.session_key)
        return Response({'status': is_authenticated}, status=status.HTTP_200_OK)









