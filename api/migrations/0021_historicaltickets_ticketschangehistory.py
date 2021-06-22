# Generated by Django 3.2.4 on 2021-06-20 16:52

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import simple_history.models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0020_tickets_userresponse'),
    ]

    operations = [
        migrations.CreateModel(
            name='TicketsChangeHistory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('changedAt', models.DateTimeField(auto_now_add=True)),
                ('ticket', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='api.tickets')),
            ],
        ),
        migrations.CreateModel(
            name='HistoricalTickets',
            fields=[
                ('id', models.BigIntegerField(auto_created=True, blank=True, db_index=True, verbose_name='ID')),
                ('status', models.CharField(choices=[('Em aberto', 'Em aberto'), ('Em análise', 'Em análise'), ('Concluído', 'Concluído'), ('Rejeitado', 'Rejeitado')], default='Em aberto', max_length=50)),
                ('priority', models.CharField(choices=[('Baixa', 'Baixa'), ('Media', 'Media'), ('Alta', 'Alta')], default='Baixa', max_length=50)),
                ('numApOccurrence', models.IntegerField()),
                ('description', models.TextField()),
                ('feedbackManager', models.TextField(blank=True)),
                ('openDate', models.DateTimeField(blank=True, editable=False)),
                ('files', models.TextField(blank=True, max_length=100, null=True)),
                ('userResponse', models.TextField(blank=True, null=True)),
                ('history_id', models.AutoField(primary_key=True, serialize=False)),
                ('history_date', models.DateTimeField()),
                ('history_change_reason', models.CharField(max_length=100, null=True)),
                ('history_type', models.CharField(choices=[('+', 'Created'), ('~', 'Changed'), ('-', 'Deleted')], max_length=1)),
                ('history_user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL)),
                ('problem', models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='api.problems', to_field='problemType')),
                ('user', models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'historical tickets',
                'ordering': ('-history_date', '-history_id'),
                'get_latest_by': 'history_date',
            },
            bases=(simple_history.models.HistoricalChanges, models.Model),
        ),
    ]