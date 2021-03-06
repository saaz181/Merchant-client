# Generated by Django 3.2.4 on 2021-07-01 10:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0030_auto_20210630_0222'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='billing_address',
        ),
        migrations.RemoveField(
            model_name='user',
            name='date_ordered',
        ),
        migrations.RemoveField(
            model_name='useraddress',
            name='address_type',
        ),
        migrations.AddField(
            model_name='useraddress',
            name='address',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='useraddress',
            name='date_ordered',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
        migrations.AddField(
            model_name='useraddress',
            name='state',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]
