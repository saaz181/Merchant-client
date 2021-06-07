from rest_framework.response import Response
from rest_framework.views import APIView
from api.models import Merchant
from django.shortcuts import render
from rest_framework import status, generics
from .models import Merchant, Products
from .serializers import CreateMerchantSerializer, CreateProductSerializer, MerchantSerializer, ProductSerializer
from validate_email import validate_email
from rest_framework.decorators import api_view
from rest_framework.parsers import MultiPartParser, FormParser, FileUploadParser

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
    
    def get(self, request, format=None):
        snippets = Merchant.objects.all()
        serializer = self.serializer_class(snippets, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        
        if serializer.is_valid():
            merchant_session = self.request.session.session_key
            name = serializer.data.get('name')
            address = serializer.data.get('address')
            first_name = serializer.data.get('first_name')
            last_name = serializer.data.get('last_name')
            phone = serializer.data.get('phone')
            merchant_logo = serializer.data.get('merchant_logo')
            country = serializer.data.get('country')
            province = serializer.data.get('province')
            city = serializer.data.get('city')
            email = serializer.data.get('email')
            is_merchant = serializer.data.get('is_merchant')
            credit_card = serializer.data.get('credit_card')
            shaba_code = serializer.data.get('shaba_code')
            

            queryset = Merchant.objects.filter(merchant_id=serializer.data.get('merchant_id'))
            if queryset.exists():
                print('-------- Existing Query ------------')
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
                merchant.is_merchant = is_merchant
                merchant.credit_card = credit_card
                merchant.shaba_code = shaba_code
                
                merchant.save(update_fields=['name',
                                            'address',
                                            'first_name',
                                            'last_name',
                                            'phone',
                                            'merchant_logo',
                                            'country',
                                            'province',
                                            'city',
                                            'email',
                                            'is_merchant',
                                            'credit_card',
                                            'shaba_code'])
                self.request.session['merchant_id'] = merchant.merchant_id
                return Response(MerchantSerializer(merchant).data, status=status.HTTP_201_CREATED)

            else:
                print('-------- Creating Query ------------')

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
                data = CreateMerchantSerializer(merchant[0]).data
                return Response(data, status=status.HTTP_200_OK)
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
        















