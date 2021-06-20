from django.contrib.auth.models import User, Group
from rest_framework import serializers
from api.models import Users, Tickets, Notifications, Problems, ColorPriority
import datetime
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password
import django_filters


class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['id', 'name', 'lastName', 'numAp',
                  'floor', 'email', 'password', 'cpf', 'phone', 'isUser', 'isAdmin', 'is_active']

    def validate_password(self, value: str) -> str:
        """
        Hash value passed by user.

        :param value: password of a user
        :return: a hashed version of the password
        """
        return make_password(value)


class TicketsSerializer(serializers.ModelSerializer):
    # user = serializers.PrimaryKeyRelatedField(
    #     read_only=True, default=serializers.CurrentUserDefault())
    status = serializers.ChoiceField(
        choices=Tickets.STATUS_CHOICES)
    priority = serializers.ChoiceField(
        choices=Tickets.PRIORITY_CHOICES)
    files = serializers.FileField(required=False, allow_null=True)
    user_email = serializers.ReadOnlyField(source='user.email')

    class Meta:
        model = Tickets
        fields = ['id', 'user', 'problem', 'status', 'priority',
                  'numApOccurrence', 'description', 'feedbackManager', 'openDate', 'files', 'user_email', 'userResponse']

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['user'] = UsersSerializer(instance.user).data
        return response

    def get_status(self, obj):
        return obj.get_status_display()

    def get_priority(self, obj):
        return obj.get_priority_display()


class NotificationsSerializer(serializers.ModelSerializer):
    notificationType = serializers.ChoiceField(
        choices=Notifications.NOTIFICATION_CHOICES)

    class Meta:
        model = Notifications
        fields = ['id', 'notificationType', 'description', 'date']


class ProblemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Problems
        fields = '__all__'


class TicketsFilterUserSerializer(serializers.ModelSerializer):
    user_name = serializers.ReadOnlyField(source='user.name')
    user_numAp = serializers.ReadOnlyField(source='user.numAp')
    status = serializers.ChoiceField(
        choices=Tickets.STATUS_CHOICES)
    priority = serializers.ChoiceField(
        choices=Tickets.PRIORITY_CHOICES)

    class Meta:
        model = Tickets
        fields = ['id', 'user', 'problem', 'status', 'priority',
                  'numApOccurrence', 'description', 'feedbackManager', 'openDate', 'files', 'user_name', 'user_numAp', 'userResponse']

    def get_status(self, obj):
        return obj.get_status_display()

    def get_priority(self, obj):
        return obj.get_priority_display()


class ColorPrioritySerializer(serializers.ModelSerializer):
    class Meta:
        model = ColorPriority
        fields = '__all__'


class TicketsHistoryChangeSerializer(serializers.ModelSerializer):
    user_name = serializers.ReadOnlyField(source='user.name')

    class Meta:
        model = Tickets.history.model
        fields = ['id', 'user', 'status', 'priority',
                  'feedbackManager', 'user_name',  'userResponse', 'history_date']
