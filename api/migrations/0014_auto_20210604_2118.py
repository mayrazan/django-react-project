# Generated by Django 3.2.3 on 2021-06-05 00:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0013_alter_users_numap'),
    ]

    operations = [
        migrations.AlterField(
            model_name='users',
            name='floor',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='users',
            name='numAp',
            field=models.IntegerField(),
        ),
    ]
