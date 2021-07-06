from re import T
from django.db import models
import string
import random
from django.core.validators import MinValueValidator
from django.db.models.fields import BooleanField
from django.utils.text import slugify
from django.db.models.signals import (post_save, pre_save)
from django.dispatch import receiver


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
    merchant_logo = models.ImageField(blank=True, null=True, upload_to='profile_picture/')
    created_at  = models.DateTimeField(auto_now_add=True)
    country = models.CharField(max_length=40)
    province = models.CharField(max_length=40)
    city = models.CharField(max_length=40)
    product = models.ManyToManyField('Products', blank=True)
    email = models.EmailField(blank=True, null=True)
    is_merchant = models.BooleanField(default=True)
    credit_card = models.CharField(max_length=16, unique=True)
    shaba_code = models.CharField(max_length=50, unique=True)
    unique_email = models.EmailField(blank=True, null=True, default='example@example.com')
    earned = models.FloatField(default=0, blank=True, null=True)
    orders = models.ManyToManyField('UserCart', blank=True)

    def __str__(self) -> str:
        return self.first_name.capitalize() + ' ' + self.last_name.capitalize()

    class Meta:
        verbose_name_plural = 'Merchants'


# Category of each product
class Categories(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100)
    sub_category = models.ManyToManyField('SubCategory', blank=True)
    
    def __str__(self) -> str:
        return self.title
    
    class Meta:
        verbose_name_plural = 'Categories'


class SubCategory(models.Model):
    title = models.CharField(max_length=100)
    sub_sub_category = models.ManyToManyField('SubSubCategory', blank=True)


    def __str__(self) -> str:
        return self.title

    class Meta:
        verbose_name_plural = 'sub-categories'

class SubSubCategory(models.Model):
    title = models.CharField(max_length=100)
    
    def __str__(self) -> str:
        return self.title

    class Meta:
        verbose_name_plural = 'sub-sub-categories'

class Products(models.Model):
    merchant_id = models.CharField(max_length=13)
    product_name = models.CharField(max_length=100)
    product_description = models.CharField(max_length=2000)
    product_image = models.ImageField(default='index.png', upload_to='product_pictures/')
    price = models.FloatField(default=0, validators=[MinValueValidator(0)])
    quantity = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    off = models.FloatField(blank=True, null=True, default=0)
    visited_time = models.IntegerField(blank=True, null=True)
    purchased_time = models.IntegerField(blank=True, null=True)
    category = models.ManyToManyField(Categories, blank=True)
    sub_category = models.ManyToManyField(SubCategory, blank=True)
    sub_sub_category = models.ManyToManyField(SubSubCategory, blank=True)
    slug = models.SlugField(max_length=200, blank=True, null=True)
    merchant_logo = models.ImageField(blank=True, null=True)

    def __str__(self) -> str:
        return self.product_name
    
    def main_price(self, price, off):
        if off and off != 0:
            return off
        return price

    class Meta:
        verbose_name_plural = 'Products'


# @receiver(post_save, sender=Products)
# def product_created_handler(sender, instance, created, *args, **kwargs):
#     if not instance.slug:
#         instance.slug = slugify(instance.product_name) # this is my title -> this-is-my-title
#         instance.save()
    

@receiver(pre_save, sender=Products)
def handle_slug_for_product(sender, instance, *args, **kwargs):
        if not instance.slug:
            instance.slug = slugify(instance.product_name)
    

class UserCart(models.Model):
    username = models.CharField(max_length=50, blank=True, null=True)
    product = models.ForeignKey(Products, blank=True, null=True, related_name='cart_product',on_delete=models.SET_NULL)
    quantity = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    address = models.ForeignKey('UserAddress', blank=True, null=True, on_delete=models.SET_NULL)
    ordered = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f'Product: {self.product} - Quantity: {self.quantity}' 

    def total_product_price(self):
        return self.quantity * self.product.price

    def total_product_off_price(self):
        if self.product.off:
            return self.quantity * self.product.off

    def profit_from_this_buy(self):
        return self.total_product_price() - self.total_product_off_price()

    def payment_price(self):
        if self.product.off:
            return self.total_product_off_price()
        return self.total_product_price()

    class Meta:
        verbose_name_plural = 'User Cart'

class User(models.Model):
    username = models.CharField(max_length=50, unique=True, blank=True, null=True)
    cart = models.ManyToManyField(UserCart, blank=True)    
    is_merchant = models.BooleanField(default=False)
    shipping_address = models.ForeignKey('UserAddress', related_name='shipping_address', blank=True, null=True, on_delete=models.SET_NULL)
    orders = models.ManyToManyField('Orders', blank=True)

    def __str__(self) -> str:
        return self.username

    def get_total(self):
        total = 0
        for product in self.cart.all():
            total += product.payment_price()
        
        return total
    
    def get_description_for_payment(self):
        description = ''
        for product in self.cart.all():
            desc = product.product.product_name + '\n'
            description += desc
        
        return description

class UserAddress(models.Model):
    username = models.CharField(max_length=50, blank=True, null=True)
    first_name = models.CharField(max_length=200, blank=True, null=True)
    last_name = models.CharField(max_length=200, blank=True, null=True)
    zip_code = models.CharField(max_length=30, blank=True, null=True)
    phone = models.CharField(max_length=30, blank=True, null=True)
    country = models.CharField(max_length=50, blank=True, null=True)
    state = models.CharField(max_length=50, blank=True, null=True)
    city = models.CharField(max_length=50, blank=True, null=True)
    address = models.CharField(max_length=255, blank=True, null=True)
    date_ordered = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    default = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.username

    class Meta:
        get_latest_by = ['address']

class Orders(models.Model):
    username = models.CharField(max_length=50, blank=True, null=True)
    order = models.ManyToManyField(UserCart, blank=True)
    address = models.ForeignKey(UserAddress, blank=True, null=True, on_delete=models.CASCADE)
    is_delivered = models,BooleanField(default=False)
    is_received = models.BooleanField(default=False)
    date_received = models.DateTimeField(blank=True, null=True)
    date_delivered = models.DateTimeField(blank=True, null=True)

    def __str__(self) -> str:
        return self.username
    
   
    class Meta:
        verbose_name_plural = 'Orders'

class GoogleToken(models.Model):
    user = models.CharField(max_length=50, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    refresh_token = models.CharField(max_length=150)
    access_token = models.CharField(max_length=150)
    expires_in = models.DateTimeField()
    token_type = models.CharField(max_length=50)
    



