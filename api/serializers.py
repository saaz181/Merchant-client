from django.db import models
from django.db.models import fields
from rest_framework import serializers
from .models import Merchant, Products, User, UserProducts


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
            'purchased_time',
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

