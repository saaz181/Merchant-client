from django.urls import path
from .views import *

urlpatterns = [
    path('create-merchant', CreateMerchantView.as_view()),
    path('merchant', MerchantView.as_view()),
    path('get-merchant-info', GetMerchantInfo.as_view()),
    path('validate-email/<str:email>', email_validator),
    path('user-has-merchant', UserHasMerchantPage.as_view()),

    path('create-user', CreateUser.as_view()),
    path('create-cart', CreateCart.as_view()),
    path('create-cart/<int:pk>', CreateCart.as_view()),

    path('create-product', CreateProductView.as_view()),
    path('product', GetAllProducts.as_view()),
    path('product/<int:pk>/<slug:slug>', GetProduct.as_view()),
    path('product/<int:pk>', GetProduct.as_view()),
    
    path('order-info', orderInfo.as_view()),
    path('order-info/<str:currentAddress>', orderInfo.as_view()),

    path('create-order', OrderItem.as_view()),

    path('category', CategoryView.as_view()),
    path('category/<int:pk>', CategoryView.as_view()),

    path('google-get-auth-url', AuthURL.as_view()),
    path('redirect', google_callback),
    path('is-user-authenticated', IsAuthenticated.as_view()),
    path('google-info', GetInfo.as_view()),
    path('google-log-out', Logout.as_view()),

]
