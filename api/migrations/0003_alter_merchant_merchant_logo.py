# Generated by Django 3.2.4 on 2021-06-07 11:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_merchant_merchant_logo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='merchant',
            name='merchant_logo',
            field=models.ImageField(blank=True, default='frontend/static/images/index.jpg', null=True, upload_to='frontend/static/images/merchant_logo'),
        ),
    ]
