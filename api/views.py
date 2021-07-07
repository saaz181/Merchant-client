from django.db.models.query import QuerySet
from rest_framework.response import Response
from rest_framework.serializers import Serializer
from rest_framework.views import APIView
from django.shortcuts import redirect, render
from rest_framework import status, generics
from rest_framework import mixins
from .models import *
from .serializers import *
from validate_email import validate_email
from rest_framework.decorators import api_view
from rest_framework.parsers import MultiPartParser
from .google_auth import *
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
            u_email = request.session.get('email')

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
                                shaba_code=shaba_code,
                                unique_email=u_email)
                                
            
            merchant.save()        
            self.request.session['merchant_id'] = merchant.merchant_id
            return Response(MerchantSerializer(merchant).data, status=status.HTTP_201_CREATED)
        
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, format=None):
        if is_authenticated_google(self.request.session.session_key):
            merchant_id = request.session.get('merchant_id')
            merchant = Merchant.objects.get(merchant_id=merchant_id)
            merchant.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

        else:
            return Response({'UnAuthorized': 'You are not Allowed'}, status=status.HTTP_401_UNAUTHORIZED)

    def put(self, request, format=None):
        if is_authenticated_google(self.request.session.session_key):
            serializer = self.serializer_class(data=request.data)

            if serializer.is_valid():
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
                credit_card = serializer.validated_data.get('credit_card')
                shaba_code = serializer.validated_data.get('shaba_code')
                
                u_email = request.session.get('email')
                merchant_id = request.session.get('merchant_id')

                queryset = Merchant.objects.filter(merchant_id=merchant_id, unique_email=u_email)
                if queryset.exists():
                    merchant = queryset[0]
                    merchant.name = name
                    merchant.address = address
                    merchant.first_name = first_name
                    merchant.last_name = last_name
                    merchant.phone = phone
                    merchant.merchant_logo = merchant_logo
                    merchant.country = country
                    merchant.province = province
                    merchant.city = city
                    merchant.email = email
                    merchant.credit_card = credit_card
                    merchant.shaba_code = shaba_code

                    if merchant_logo:
                        merchant.save(update_fields=['name', 
                                                    'address', 
                                                    'first_name', 
                                                    'last_name', 
                                                    'phone', 
                                                    'merchant_logo', 
                                                    'country', 
                                                    'province', 
                                                    'city', 
                                                    'credit_card', 
                                                    'shaba_code'])
                    else:
                        merchant.save(update_fields=['name', 
                                                    'address', 
                                                    'first_name', 
                                                    'last_name', 
                                                    'phone',  
                                                    'country', 
                                                    'province', 
                                                    'city', 
                                                    'credit_card', 
                                                    'shaba_code'])

                else:
                    return Response({'Not Found': 'Your Account Not Found'}, status=status.HTTP_404_NOT_FOUND)
            else:
                print(serializer.errors)
                return Response(serializer.errors, status=status.HTTP_204_NO_CONTENT)

        else:
            return Response({'UNAUTHORIZED': 'You are not Allowed'}, status=status.HTTP_401_UNAUTHORIZED)


class GetMerchantInfo(APIView):
    serializer_class = MerchantSerializer
    lookup_url_kwarg = 'id'
    def get(self, request, format=None):
        if is_authenticated_google(self.request.session.session_key):
            merchant_id = request.GET.get(self.lookup_url_kwarg)
            email = request.session.get('email')
            if merchant_id != None:
                merchant = Merchant.objects.filter(merchant_id=merchant_id, unique_email=email)
                if merchant.exists():
                    if email:
                        data = MainMerchantPageSerializer(merchant[0]).data
                        return Response(data, status=status.HTTP_200_OK)
                    
                    else:
                        return Response({'Unauthorized Request': 'You are not authorized'}, status=status.HTTP_401_UNAUTHORIZED)
                else:
                    return Response({'Error': "Merchant Not found or request isn't from merchant"}, status=status.HTTP_400_BAD_REQUEST)
            
            return Response({'Bad Request': "merchant ID not found in request"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'Unauthorized Request': 'You are not authorized'}, status=status.HTTP_401_UNAUTHORIZED)

class UserHasMerchantPage(APIView):
    def get(self, request, format=None):
        if is_authenticated_google(self.request.session.session_key):
            email = self.request.session.get('email')
            if email:
                user = Merchant.objects.filter(unique_email=email)
                lenght = len(user)
                if user.exists():
                    merchant = user[lenght - 1]
                    data = UpdateMerchantSerializer(merchant).data
                    merchant_id = data.get('merchant_id')
                    self.request.session['merchant_id'] = merchant_id
                    return Response(data, status=status.HTTP_200_OK)

                else:
                    return Response({'Not Found': 'The request doesn\'t return anything'}, status=status.HTTP_404_NOT_FOUND)
            else:
                return Response({'Not Authorized Request': 'Make sure to login and create Merchat'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({'Not Authorized Request': 'You are not authorized to see this page'}, status=status.HTTP_401_UNAUTHORIZED)



""" Product Section """
##########################################

class ProductView(generics.CreateAPIView):
    queryset = Products.objects.all()
    serializer_class = ProductSerializer


class CreateProductView(APIView):
    serializer_class = CreateProductSerializer
    parser_classes = (MultiPartParser,)
    lookup_url_kwarg = 'product_id'
    
    def post(self, request, format=None):
        if is_authenticated_google(self.request.session.session_key):
            serializer = self.serializer_class(data=request.data)
            
            if serializer.is_valid():
                merchant_id = request.session.get('merchant_id')
                product_name = serializer.validated_data.get('product_name')
                product_description = serializer.validated_data.get('product_description')
                product_image = serializer.validated_data.get('product_image')
                price = serializer.validated_data.get('price')
                quantity = serializer.validated_data.get('quantity')
                off = serializer.validated_data.get('off')
                visited_time = serializer.validated_data.get('visited_time')
                purchased_time = serializer.validated_data.get('purchased_time')
                
                # get merchant profile
                queryset_merchant = Merchant.objects.filter(merchant_id=merchant_id)[0]
                merchant_logo = queryset_merchant.merchant_logo
                
                queryset = Products.objects.filter(merchant_id=merchant_id, product_name=product_name)
                if queryset.exists():
                    id = queryset[0].id
                    product = Products(
                    id=id,
                    product_description=product_description, 
                    product_image=product_image,
                    price=price,
                    quantity=quantity,
                    off=off,
                    visited_time=visited_time,
                    purchased_time=purchased_time,
                    merchant_logo=merchant_logo
                    )

                    product.save(update_fields=['product_description', 'product_image', 'price', 'quantity', 'off', 'visited_time', 'purchased_time'])
                    merchant = Merchant.objects.get(merchant_id=merchant_id)
                    merchant.product.add(product)

                    return Response(CreateProductSerializer(product).data, status=status.HTTP_201_CREATED)
                
                else:
                    
                    product = Products(merchant_id=merchant_id, 
                                    product_name=product_name, 
                                    product_description=product_description, 
                                    product_image=product_image, 
                                    price=price, 
                                    quantity=quantity, 
                                    off=off, 
                                    visited_time=visited_time, 
                                    purchased_time=purchased_time,
                                    merchant_logo=merchant_logo
                                    )
                    product.save()
                    merchant = Merchant.objects.get(merchant_id=merchant_id)
                    merchant.product.add(product)

                    return Response(CreateProductSerializer(product).data, status=status.HTTP_201_CREATED)
            else:
                return Response({'Bad Request': serializer.errors}, status=status.HTTP_400_BAD_REQUEST) 
        else:
            return Response({'Unauthorized Request': 'You are not allowed to Create Product'}, status=status.HTTP_401_UNAUTHORIZED)

    def delete(self, request, format=None):
            if is_authenticated_google(self.request.session.session_key):
                merchant_id = request.session.get('merchant_id')
                id = request.GET.get(self.lookup_url_kwarg)
                product = Products.objects.get(merchant_id=merchant_id, id=id)
                product.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            else:
                return Response({'Unauthorized Request': 'You are not allowed to Remove Product'}, status=status.HTTP_401_UNAUTHORIZED)

    def put(self, request, format=None):
        if is_authenticated_google(self.request.session.session_key):            
            
            serializer = self.serializer_class(data=request.data)
            
            if serializer.is_valid():
                id = request.GET.get('product_id')
                merchant_id = request.session.get('merchant_id')
                product_name = serializer.validated_data.get('product_name')
                product_description = serializer.validated_data.get('product_description')
                product_image = serializer.validated_data.get('product_image')
                price = serializer.validated_data.get('price')
                quantity = serializer.validated_data.get('quantity')
                off = serializer.validated_data.get('off')

                _product = Products.objects.filter(id=id, merchant_id=merchant_id)
                if _product.exists():
                    product = _product[0]
                    product.id = id
                    product.product_name = product_name
                    product.product_description = product_description
                    product.product_image = product_image
                    product.price = price
                    product.quantity = quantity
                    product.off = off
                    
                    if product_image:
                        product.save(update_fields=['product_name', 'product_description', 'product_image', 'price', 'quantity', 'off'])

                    else:
                        product.save(update_fields=['product_name', 'product_description', 'price', 'quantity', 'off'])

                    return Response(CreateProductSerializer(product).data, status=status.HTTP_204_NO_CONTENT)

                else:
                    return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)

            else:
                return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'Unauthorized Request': 'You are not allowed to Update Product'}, status=status.HTTP_401_UNAUTHORIZED)


class GetProduct(APIView):
    def get(self, request, pk, slug=None, format=None):
        if slug and pk:
            queryset = Products.objects.filter(id=pk, slug=slug)
        
        elif pk:
            queryset = Products.objects.filter(id=pk)

        if queryset.exists():
            product = queryset[0]
            return Response(CreateProductSerializer(product).data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

class GetAllProducts(mixins.ListModelMixin,
                    generics.GenericAPIView):
        
        queryset = Products.objects.all()
        serializer_class = CreateProductSerializer

        def get(self, request, *args, **kwargs):
            return self.list(request, *args, **kwargs)
    


##########################################        

### Category
class CategoryView(mixins.ListModelMixin,
                    mixins.CreateModelMixin,
                    mixins.DestroyModelMixin,
                    mixins.UpdateModelMixin,
                    generics.GenericAPIView):
    
    queryset = Categories.objects.all()
    serializer_class = CategorySerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
    
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
    
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
    
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
    
#############

### USER ###
class CreateUser(APIView):
    serializer_class = CreateUserSerializer

    def get(self, request, format=None):
        if is_authenticated_google(self.request.session.session_key):
            username = request.session.get('email')
            user = User.objects.filter(username=username)
            if user.exists():
                return Response(self.serializer_class(user[0]).data, status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'Unauthorizred': "You are not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)


    def post(self, request, format=None):
        if is_authenticated_google(self.request.session.session_key):
            serializer = self.serializer_class(data=request.data)
            username = request.session.get('email')
            
            if serializer.is_valid():
                check_for_user = User.objects.filter(username=username)
                if not check_for_user.exists():
                    user = User(username=username)
                    user.save()

                    return Response(status=status.HTTP_201_CREATED)

                else:
                    return Response(status=status.HTTP_204_NO_CONTENT)

            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        else:
            return Response({'Unauthorizred': "You are not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)
###################

### CREATE CART ###
class CreateCart(APIView):
    serializer_class = CreateCartSerializer

    def get(self, request, pk=None, format=None):
        if is_authenticated_google(self.request.session.session_key):
            user = request.session.get('email')
            if pk:
                cart = UserCart.objects.filter(username=user, id=pk)
                if cart.exists():
                    return Response(GetCartSerializer(cart[0]).data, status=status.HTTP_200_OK)
            
            cart = UserCart.objects.filter(username=user, ordered=False)
            if cart.exists():
                return Response(GetCartSerializer(cart, many=True).data, status=status.HTTP_200_OK)

            else:
                return Response(status=status.HTTP_404_NOT_FOUND)

        else:
            return Response({'Unauthorizred': "You are not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)

    def post(self, request, format=None):
        if is_authenticated_google(self.request.session.session_key):
            serializer = self.serializer_class(data=request.data)

            if serializer.is_valid():
                merchant_id = request.session.get('merchant_id') 
                user = request.session.get('email')
                product = serializer.validated_data.get('product')
                quantity = serializer.validated_data.get('quantity')
                print(product)
                
                if merchant_id != product.merchant_id:  
                    if quantity <= product.quantity:
                        user_cart_id = UserCart.objects.filter(username=user, product=product, ordered=False)
                        if not user_cart_id.exists():
                            cart = UserCart(username=user, product=product, quantity=quantity)
                            cart.save()

                            user_cart = User.objects.filter(username=user)
                            user_cart[0].cart.add(cart)
                            return Response(GetCartSerializer(cart).data, status=status.HTTP_200_OK)
                        
                        else:
                            user_cart_id[0].quantity += 1
                            user_cart_id[0].save()

                            user_cart = User.objects.filter(username=user)
                            user_cart[0].cart.add(user_cart_id[0])

                            return Response(GetCartSerializer(user_cart_id[0]).data, status=status.HTTP_204_NO_CONTENT)
                    
                    else:
                        return Response({'out of range': 'The quantity that you want is out of range'}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    return Response({'Product From own': "You cannot order your product"}, status=status.HTTP_400_BAD_REQUEST) 
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        else:
            return Response({'Unauthorizred': "You are not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)

    def put(self, request, pk, format=None):
        if is_authenticated_google(self.request.session.session_key):
            serializer = self.serializer_class(data=request.data)

            if serializer.is_valid():
                user = request.session.get('email')
                quantity = serializer.validated_data.get('quantity')

                cart = UserCart.objects.filter(username=user, id=pk)
                if cart.exists():
                    if quantity <= cart[0].product.quantity:
                        cart.update(quantity=quantity)
    
                        return Response(GetCartSerializer(cart[0]).data, status=status.HTTP_201_CREATED)
    
                    else:
                        return Response({'out of range': 'The quantity that you want is out of range'}, status=status.HTTP_400_BAD_REQUEST)

            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        else:
            return Response({'Unauthorizred': "You are not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)


    def delete(self, request, pk, format=None):
        if is_authenticated_google(self.request.session.session_key):
            username = request.session.get('email')
            cart_item = UserCart.objects.filter(id=pk, username=username)
            if cart_item.exists():
                cart_item.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            
            else:
                return Response({'Not Found': 'Item Not found in cart'},status=status.HTTP_404_NOT_FOUND)
        
        else:
            return Response({'Unauthorizred': "You are not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)

#####

### ORDER INFO

class orderInfo(APIView):
    serializer_class = CreateUserAddressSerializer
    lookup_url_kwarg = 'current_address'

    def get(self, request, format=None):
        if is_authenticated_google(self.request.session.session_key):
            user = request.session.get('email')
            info = UserAddress.objects.filter(username=user)
            current = request.GET.get(self.lookup_url_kwarg)

            if current == '1':
                info = User.objects.filter(username=user)
                if info.exists():
                    return Response(self.serializer_class(info[0].shipping_address).data, status=status.HTTP_200_OK)

            if info.exists():
                return Response(self.serializer_class(info, many=True).data, status=status.HTTP_200_OK)
            
            else:
                return Response(status=status.HTTP_204_NO_CONTENT)

        return Response(status=status.HTTP_401_UNAUTHORIZED)

    def post(self, request, format=None):
        if is_authenticated_google(self.request.session.session_key):
            serializer = self.serializer_class(data=request.data)

            if serializer.is_valid():
                user = request.session.get('email')
                first_name = serializer.validated_data.get('first_name')
                last_name = serializer.validated_data.get('last_name')
                zip_code = serializer.validated_data.get('zip_code')
                phone = serializer.validated_data.get('phone')
                country = serializer.validated_data.get('country')
                state = serializer.validated_data.get('state')
                city = serializer.validated_data.get('city')
                address = serializer.validated_data.get('address')
                default = serializer.validated_data.get('default')

                user_address = UserAddress(
                    username=user, 
                    first_name=first_name,
                    last_name=last_name,
                    zip_code=zip_code,
                    phone=phone,
                    country=country,
                    state=state,
                    city=city,
                    address=address,
                    default=default
                    )

                
                check_user = UserAddress.objects.filter(username=user, address=address, first_name=first_name, last_name=last_name)
                if check_user.exists():
                    user = User.objects.filter(username=user)
                    if user.exists():
                        user[0].shipping_address = check_user[0]
                        user[0].save()
                        
                        return Response(CreateUserAddressSerializer(check_user[0]).data, status=status.HTTP_201_CREATED)
                    
                else:
                    user_address.save()
                    user = User.objects.filter(username=user)
                    if user.exists():
                        user.update(shipping_address=user_address)
                            
                        return Response(CreateUserAddressSerializer(user_address).data, status=status.HTTP_201_CREATED)

        return Response(status=status.HTTP_401_UNAUTHORIZED)

##################


### CREATE ORDER
### this is for testing on RESt API the main implementation will be on the IDpay app
class OrderItem(APIView):
    serializer_class = OrderSerializer

    def get(self, request, format=None):
        orders = Orders.objects.all()
        return Response(ShowOrderSerializer(orders, many=True).data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        if is_authenticated_google(self.request.session.session_key):
            serializer = self.serializer_class(data=request.data)
            
            if serializer.is_valid():
                user = request.session.get('email')
                address = serializer.validated_data.get('address')
                user_cart = UserCart.objects.filter(username=user, ordered=True)
                
                order_instance = Orders.objects.create(username=user, address=address)
                order_instance.order.set(user_cart)

                user_order = User.objects.filter(username=user)[0]
                user_order.orders.add(order_instance)

                for product in user_cart:
                    merchant_id = product.product.merchant_id
                    ordered_quantity = product.quantity
                    product_in_merchant = Products.objects.filter(id=product.product.id)[0]
                    product_in_merchant.quantity -= ordered_quantity
                    product_in_merchant.save()
                    product.address = address
                    product.save()     
                    merchant = Merchant.objects.filter(merchant_id=merchant_id)[0]
                    merchant.orders.add(product)

                return Response(ShowOrderSerializer(order_instance).data, status=status.HTTP_201_CREATED)
            
            else:
                return Response(serializer.errors, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({'Unauthorized': 'You are not authorized to create order'}, status=status.HTTP_401_UNAUTHORIZED)

################



""" AUTHENTICATION SECTION """
#####################################################
class AuthURL(APIView):
    
    def get(self, request, format=None):
        url_endpoint = 'https://accounts.google.com/o/oauth2/v2/auth'
        state = hashlib.sha256(os.urandom(1024)).hexdigest()
        self.request.session['state'] = state
        scope = 'openid profile email'
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

    return redirect('/')

        
class IsAuthenticated(APIView):
    def get(self, request, format=None):
        is_authenticated = is_authenticated_google(self.request.session.session_key)
        return Response({'status': is_authenticated}, status=status.HTTP_200_OK)


class GetInfo(APIView):
    def get(self, request, format=None):
        session_id = self.request.session.session_key
        info = get_information_from_google(session_id)
        name = info.get('name')
        picture = info.get('picture')
        email = info.get('email')
        
        """
        For security stuff we can convert the plain text email
            into base64 encoding then decode that
            and in order to apply the encoding we need to 
            change unique_email column in Merchant in model.py
            into CharField

        Application:
            in views.py
            email = (base64.b64encode(info.get('email').encode())).decode

            in models.py:
            unique_email = models.CharField(max_length=100)
        
        """
        

        data = {
            'name': name,
            'picture': picture
        }

        self.request.session['email'] = email

        return Response(data, status=status.HTTP_200_OK)


class Logout(APIView):
    def post(self, request, format=None):
        session_id = self.request.session.session_key
        endpoint = 'https://oauth2.googleapis.com/revoke'
        access_token = get_user_tokens(session_id).access_token
        response = post(endpoint, params={
            'token': access_token
        }).json()

        google = GoogleToken.objects.filter(user=session_id)
        if google.exists():
            google.delete()

        return Response(response, status=status.HTTP_200_OK)
####################################################################





