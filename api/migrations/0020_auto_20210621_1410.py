# Generated by Django 3.2.4 on 2021-06-21 09:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0019_auto_20210620_1746'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='email',
        ),
        migrations.AlterField(
            model_name='user',
            name='address',
            field=models.CharField(max_length=255),
        ),
    ]
