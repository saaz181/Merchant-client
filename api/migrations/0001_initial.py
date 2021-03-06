# Generated by Django 3.2.4 on 2021-06-07 09:17

import api.models
import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Products',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('merchant_id', models.CharField(max_length=13)),
                ('product_name', models.CharField(max_length=100)),
                ('product_description', models.CharField(max_length=150)),
                ('product_image', models.ImageField(default='index.png', upload_to='frontend/static/images/product_picture')),
                ('price', models.FloatField(default=0, validators=[django.core.validators.MinValueValidator(0)])),
                ('quantity', models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0)])),
                ('off', models.FloatField(blank=True, default=0, null=True)),
                ('visited_time', models.IntegerField(blank=True, null=True)),
                ('purchased_time', models.IntegerField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='UserProducts',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.IntegerField()),
                ('product', models.ManyToManyField(to='api.Products')),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=50, unique=True)),
                ('is_merchant', models.BooleanField(default=False)),
                ('email', models.EmailField(max_length=254)),
                ('address', models.CharField(max_length=100)),
                ('country', models.CharField(max_length=20)),
                ('province', models.CharField(max_length=50)),
                ('city', models.CharField(max_length=50)),
                ('phone', models.CharField(blank=True, max_length=50, null=True)),
                ('cart', models.ManyToManyField(to='api.UserProducts')),
            ],
        ),
        migrations.CreateModel(
            name='Merchant',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('merchant_id', models.CharField(default=api.models.generate_merchant_id, max_length=15, unique=True)),
                ('merchant_session', models.CharField(max_length=50, null=True)),
                ('name', models.CharField(max_length=50)),
                ('address', models.CharField(max_length=70)),
                ('first_name', models.CharField(max_length=80, null=True)),
                ('last_name', models.CharField(max_length=80, null=True)),
                ('phone', models.CharField(max_length=20, null=True)),
                ('merchant_logo', models.ImageField(default='static/images/index.png', upload_to=api.models.nameFile)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('country', models.CharField(max_length=40)),
                ('province', models.CharField(max_length=40)),
                ('city', models.CharField(max_length=40)),
                ('email', models.EmailField(blank=True, max_length=254, null=True)),
                ('is_merchant', models.BooleanField(default=True)),
                ('credit_card', models.CharField(max_length=16, unique=True)),
                ('shaba_code', models.CharField(max_length=50, unique=True)),
                ('product', models.ManyToManyField(blank=True, to='api.Products')),
            ],
        ),
    ]
