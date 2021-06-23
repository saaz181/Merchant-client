from django.contrib import admin
from .models import *

admin.site.register(Products)
admin.site.register(Merchant)
admin.site.register(Category)
admin.site.register(SubCategory)
admin.site.register(SubSubCategory)
admin.site.register(UserCart)
admin.site.register(User)