# Generated by Django 3.2.4 on 2021-06-20 15:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0019_auto_20210610_2020'),
    ]

    operations = [
        migrations.AddField(
            model_name='tickets',
            name='userResponse',
            field=models.TextField(blank=True, null=True),
        ),
    ]
