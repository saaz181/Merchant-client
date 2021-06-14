from django.urls import path
from .views import *

urlpatterns = [
    path('create-merchant', CreateMerchantView.as_view()),
    path('merchant', MerchantView.as_view()),
    path('product', ProductView.as_view()),
    path('create-product', CreateProductView.as_view()),
    path('validate-email/<str:email>', email_validator),
    path('get-merchant-info', GetMerchantInfo.as_view()),
    path('user-has-merchant', UserHasMerchantPage.as_view()),
    
    path('google-get-auth-url', AuthURL.as_view()),
    path('redirect', google_callback),
    path('is-user-authenticated', IsAuthenticated.as_view()),
    path('google-info', GetInfo.as_view()),
    path('google-log-out', Logout.as_view()),


]
