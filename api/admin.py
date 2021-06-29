from django.contrib import admin
from .models import *

admin.site.register(Products)
admin.site.register(Merchant)
admin.site.register(Categories)
admin.site.register(SubCategory)
admin.site.register(SubSubCategory)
admin.site.register(UserCart)
admin.site.register(User)
admin.site.register(UserAddress)