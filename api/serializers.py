from django.db.models import fields
from rest_framework import serializers
from .models import *


class MerchantSerializer(serializers.ModelSerializer):
    merchant_logo = serializers.ImageField(use_url=True)

    class Meta:
        model = Merchant
        fields = '__all__'


class CreateMerchantSerializer(serializers.ModelSerializer):
    merchant_logo = serializers.ImageField(use_url=True)
    class Meta:
        model = Merchant
        fields = (
            'name',
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
            'created_at',
            'credit_card',
            'shaba_code'
        )

class UpdateMerchantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Merchant
        fields = ('merchant_id','merchant_logo',)



class SubSubCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SubSubCategory
        fields = '__all__'

class SubCategorySerializer(serializers.ModelSerializer):
    sub_category = SubSubCategorySerializer(many=True, read_only=True)

    class Meta:
        model = SubCategory
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    sub_category = SubCategorySerializer(many=True, read_only=True)
    class Meta:
        model = Categories
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Products
        fields = '__all__'

class CreateProductSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Products
        fields = (
            'id',
            'product_name',
            'product_description',
            'product_image',
            'price',
            'quantity',
            'off',
            'visited_time',
            'category',
            'purchased_time',
            'slug',
            'merchant_logo',
            'rate'
        )


class MainMerchantPageSerializer(serializers.ModelSerializer):
    product = CreateProductSerializer(many=True, read_only=True)
    
    class Meta:
        model = Merchant
        fields = (    
            'name',
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
            'product',
            'created_at',
            'credit_card',
            'shaba_code'
        )


    
    
class GetCartSerializer(serializers.ModelSerializer):
    product = CreateProductSerializer(read_only=True) 

    class Meta:
        model = UserCart
        fields = ('id', 'product', 'quantity', 'ordered')


class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'



class CreateUserAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAddress
        fields = (
            'first_name',
            'last_name',
            'zip_code',
            'phone',
            'country',
            'state',
            'city',
            'address',
            'default'
        )

class CreateCartSerializer(serializers.ModelSerializer):
    address = CreateUserAddressSerializer(read_only=True)
    
    class Meta:
        model = UserCart
        fields = '__all__'

class ShowCartSerializer(serializers.ModelSerializer):
    address = CreateUserAddressSerializer(read_only=True)
    product = CreateProductSerializer(read_only=True)

    class Meta:
        model = UserCart
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    order = CreateCartSerializer
    address = CreateUserAddressSerializer

    class Meta:
        model = Orders
        fields = ('id', 'address')

class ShowOrderSerializer(serializers.ModelSerializer):
    order = ShowCartSerializer(many=True, read_only=True)
    address = CreateUserAddressSerializer(read_only=True)

    class Meta:
        model = Orders
        fields = '__all__'
