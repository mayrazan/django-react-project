from django.contrib.auth.models import User, Group
from rest_framework import serializers
from api.models import Users, Tickets


class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = '__all__'


class TicketsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tickets
        fields = '__all__'
