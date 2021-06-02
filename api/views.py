from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from api.serializers import UsersSerializer, TicketsSerializer
from api.models import Users, Tickets


class UsersViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Users.objects.all()
    serializer_class = UsersSerializer
    permission_classes = [permissions.AllowAny]


class TicketsViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Tickets.objects.all().order_by('-openDate')
    serializer_class = TicketsSerializer
    permission_classes = [permissions.AllowAny]
