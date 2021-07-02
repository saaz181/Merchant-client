from django.db import models
import random
import string

def generate_order_id():
    characters = string.ascii_uppercase + string.ascii_lowercase + string.digits
    length = random.randint(1, 50)
    find_order_id = False
    while not find_order_id:
        order_id = ''.join(random.choices(characters, k=length))
        if PaymentId.objects.filter(order_id=order_id).count() == 0:
            find_order_id = True
    return order_id

class PaymentId(models.Model):
    order_id = models.CharField(max_length=50, unique=True, default=generate_order_id)
    payment_id = models.CharField(max_length=100, unique=True)
    payment_link = models.CharField(max_length=255, unique=True)