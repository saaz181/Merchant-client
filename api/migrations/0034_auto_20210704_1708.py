# Generated by Django 3.2.4 on 2021-07-04 12:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0033_auto_20210704_1544'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='orders',
            options={'verbose_name_plural': 'Orders'},
        ),
        migrations.RemoveField(
            model_name='useraddress',
            name='credit_cart',
        ),
    ]
