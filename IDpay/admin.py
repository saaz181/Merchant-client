from django.contrib import admin
from .models import *

class PaymentIdAdmin(admin.ModelAdmin):
    list_display = ('username', 'order_id')
    readonly_fields = ('username', 'order_id', 'payment_id' , 'payment_link', 'track_id')
    list_filter = ('username',)

    def has_add_permission(self, request, obj=None) -> bool:
        return False


admin.site.register(PaymentId, PaymentIdAdmin)
admin.site.register(PaymentInfo)