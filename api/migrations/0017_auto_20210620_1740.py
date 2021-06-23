# Generated by Django 3.2.4 on 2021-06-20 13:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0016_auto_20210620_1738'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='category',
            name='sub_category',
        ),
        migrations.AddField(
            model_name='category',
            name='sub_category',
            field=models.ManyToManyField(blank=True, null=True, related_name='_api_category_sub_category_+', to='api.Category'),
        ),
        migrations.RemoveField(
            model_name='category',
            name='sub_sub_category',
        ),
        migrations.AddField(
            model_name='category',
            name='sub_sub_category',
            field=models.ManyToManyField(blank=True, null=True, related_name='_api_category_sub_sub_category_+', to='api.Category'),
        ),
    ]