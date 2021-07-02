from django.urls import path
from requests.api import patch
from .views import index

app_name = 'frontend'

urlpatterns = [
    path('', index, name=''),
    path('merchant', index, name=''),
    path('user', index, name=''),
    path('merchant/<str:merchantId>', index),
    path('make-product/<str:merchantId>', index),
    path('account-info', index),
    path('active-product', index),
    path('product/<int:pk>', index),
    path('product/<int:pk>/<slug:slug>', index),
    path('cart', index),
    path('order', index),
    path('error', index),
    path('checkout', index),
    
]
