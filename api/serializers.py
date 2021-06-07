from django.contrib.auth.models import User, Group
from rest_framework import serializers
from api.models import Users, Tickets, Notifications, Problems, Files
import datetime
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password
import django_filters


class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['id', 'name', 'lastName', 'avatar', 'numAp',
                  'floor', 'email', 'password', 'cpf', 'phone', 'isUser', 'isAdmin', 'is_active']

    def validate_password(self, value: str) -> str:
        """
        Hash value passed by user.

        :param value: password of a user
        :return: a hashed version of the password
        """
        return make_password(value)


class FilesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Files
        fields = '__all__'


class TicketsSerializer(serializers.ModelSerializer):
    # user = serializers.PrimaryKeyRelatedField(
    #     read_only=True, default=serializers.CurrentUserDefault())
    status = serializers.ChoiceField(choices=Tickets.STATUS_CHOICES)
    priority = serializers.ChoiceField(choices=Tickets.PRIORITY_CHOICES)
    files = serializers.FileField(required=False, allow_null=True)

    class Meta:
        model = Tickets
        fields = ['id', 'user', 'problem', 'status', 'priority',
                  'numApOccurrence', 'description', 'feedbackManager', 'openDate', 'files']

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['user'] = UsersSerializer(instance.user).data
        return response


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


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Customizes JWT default Serializer to add more information about user"""
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['name'] = user.name
        token['email'] = user.email
        token['isAdmin'] = user.isAdmin
        token['isUser'] = user.isUser
        token['password'] = user.password
        token['id'] = user.id

        return token


class TicketsFilterUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tickets
        fields = ['id', 'user', 'problem', 'status', 'priority',
                  'numApOccurrence', 'description', 'feedbackManager', 'openDate', 'files']

    # def to_representation(self, instance):
    #     response = super().to_representation(instance)
    #     response['user'] = UsersSerializer(instance.user).data
    #     return response
