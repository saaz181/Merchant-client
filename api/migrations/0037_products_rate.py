# Generated by Django 3.2.4 on 2021-07-06 17:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0036_alter_merchant_orders'),
    ]

    operations = [
        migrations.AddField(
            model_name='products',
            name='rate',
            field=models.IntegerField(default=0),
        ),
    ]
