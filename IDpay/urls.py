from django.urls import path
from .views import *

app_name = 'IDpay'

urlpatterns = [
    path('payment', GetPaymentUrl.as_view()),
     path('redirect', idpay_callback)
]
