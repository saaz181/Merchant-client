from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
import uuid

def generate_order_id():
    find_order_id = False
    while not find_order_id:
        order_id = str(uuid.uuid1())
        if PaymentId.objects.filter(order_id=order_id).count() == 0:
            find_order_id = True
    return order_id

class PaymentId(models.Model):
    username = models.CharField(max_length=50, blank=True, null=True)
    order_id = models.CharField(max_length=50, unique=True, blank=True, null=True)
    payment_id = models.CharField(max_length=100, unique=True)
    payment_link = models.CharField(max_length=255, unique=True)
    track_id = models.IntegerField(unique=True, blank=True, null=True)

    def __str__(self) -> str:
        return self.order_id
    
    class Meta:
        verbose_name_plural = 'Payment ID'

class PaymentInfo(models.Model):
    amount = models.IntegerField(default=0, validators=[MaxValueValidator(500000000), MinValueValidator(1000)])
    full_name = models.CharField(max_length=255, blank=True, null=True)
    phone = models.CharField(max_length=11, blank=True, null=True)
    mail = models.EmailField(max_length=255, blank=True, null=True)
    desc = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        verbose_name_plural = 'Payment Info'