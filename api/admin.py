from django.contrib import admin
from django.contrib import messages
from .models import *


class UserCartAdmin(admin.ModelAdmin):
    list_display = ('username', 'quantity', 'ordered')
    list_filter = ('username',)

    def active(self, obj):
        return obj.is_active == 1
    
    active.boolean = True

    def make_order(modeladmin, request, queryset):
        queryset.update(ordered=True)
        messages.success(request, "Item(s) ordered Successfully")
    
    def cancel_order(modeladmin, request, queryset):
        queryset.update(ordered=False)
        messages.success(request, "Order Items(s) canceled")

    admin.site.add_action(make_order, " make order")
    admin.site.add_action(cancel_order, "cancel order")

    def has_delete_permission(self, request, obj = None):
        return True

class UserAddressAdmin(admin.ModelAdmin):
    list_display = ('username', 'show_name')
    list_filter = ('country', 'city', 'state')

    @admin.display(description='Name')
    def show_name(self, obj):
        return ("%s %s" % (obj.first_name.capitalize(), obj.last_name.capitalize()))


class MerchantAdmin(admin.ModelAdmin):
    readonly_fields = ('merchant_id', 'merchant_session', 'is_merchant',)
    list_filter = ('country', 'province', 'city')

    def has_add_permission(self, request, obj=None) -> bool:
        return True # for developemnt

class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'order')
    readonly_fields = ('is_merchant',)

    @admin.display(description='order(s)')
    def order(self, obj):
        number_of_order = len(obj.orders.all())
        return number_of_order


admin.site.register(Products)
admin.site.register(Merchant, MerchantAdmin)
admin.site.register(Categories)
admin.site.register(SubCategory)
admin.site.register(SubSubCategory)
admin.site.register(UserCart, UserCartAdmin)
admin.site.register(User, UserAdmin)
admin.site.register(UserAddress, UserAddressAdmin)
admin.site.register(Orders)

