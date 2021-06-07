from django.urls import path
from .views import index

app_name = 'frontend'

urlpatterns = [
    path('', index, name=''),
    path('merchant', index, name=''),
    path('user', index, name=''),
    path('merchant/<str:merchantId>', index),
    
]