from django.core import validators
from django.db import models
import string
import random
from django.core.validators import MinValueValidator

def generate_merchant_id():
    length = 12
    main_string = string.ascii_lowercase + string.ascii_uppercase + string.digits
    while True:
        id = ''.join(random.choices(main_string, k=length))
        if Merchant.objects.filter(merchant_id=id).count() == 0:
            break
    
    return id

def nameFile(instance, filename):
    return '/'.join(['images', str(instance.name), filename])



class Merchant(models.Model):
    merchant_id = models.CharField(max_length=15, default=generate_merchant_id, unique=True)
    merchant_session = models.CharField(max_length=50, null=True)
    name = models.CharField(max_length=50)
    address = models.CharField(max_length=70)
    first_name = models.CharField(max_length=80, null=True)
    last_name = models.CharField(max_length=80, null=True)
    phone = models.CharField(max_length=20, null=True)
    merchant_logo = models.ImageField(upload_to='frontend/static/images/merchant_logo' , default='frontend/static/images/index.jpg', blank=True, null=True)

    created_at  = models.DateTimeField(auto_now_add=True)
    country = models.CharField(max_length=40)
    province = models.CharField(max_length=40)
    city = models.CharField(max_length=40)
    product = models.ManyToManyField('Products', blank=True)
    email = models.EmailField(blank=True, null=True)
    is_merchant = models.BooleanField(default=True)
    credit_card = models.CharField(max_length=16, unique=True)
    shaba_code = models.CharField(max_length=50, unique=True)

    def __str__(self) -> str:
        return self.merchant_id

class Products(models.Model):
    merchant_id = models.CharField(max_length=13)
    product_name = models.CharField(max_length=100)
    product_description = models.CharField(max_length=150)
    product_image = models.ImageField(default='index.png', upload_to='frontend/static/images/product_picture')
    price = models.FloatField(default=0, validators=[MinValueValidator(0)])
    quantity = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    off = models.FloatField(blank=True, null=True, default=0)
    visited_time = models.IntegerField(blank=True, null=True)
    purchased_time = models.IntegerField(blank=True, null=True)

    def __str__(self) -> str:
        return self.product_name

class UserProducts(models.Model):
    product = models.ManyToManyField(Products)
    quantity = models.IntegerField()

    def __str__(self):
        return self.product

class User(models.Model):
    username = models.CharField(max_length=50, unique=True)
    cart = models.ManyToManyField(UserProducts)    
    is_merchant = models.BooleanField(default=False)
    email = models.EmailField()
    address = models.CharField(max_length=100)
    country = models.CharField(max_length=20)
    province = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    phone = models.CharField(max_length=50, blank=True, null=True)







