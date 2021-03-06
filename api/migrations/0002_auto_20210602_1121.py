# Generated by Django 3.2.3 on 2021-06-02 14:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Notifications',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('notificationType', models.CharField(choices=[('MA', 'Manutenção'), ('MU', 'Mudança'), ('RE', 'Reunião'), ('IG', 'Informações Gerais'), ('OU', 'Outros')], default='IG', max_length=2)),
                ('description', models.TextField()),
                ('date', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Problems',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('problemType', models.CharField(max_length=50)),
            ],
        ),
        migrations.AlterField(
            model_name='tickets',
            name='problem',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.problems'),
        ),
    ]
