from django.urls import path
from .views import MerchantView, CreateMerchantView, ProductView, email_validator, GetMerchantInfo

urlpatterns = [
    path('create-merchant', CreateMerchantView.as_view()),
    path('merchant', MerchantView.as_view()),
    path('product', ProductView.as_view()),
    path('validate-email/<str:email>', email_validator),
    path('get-merchant-info', GetMerchantInfo.as_view()),


]
