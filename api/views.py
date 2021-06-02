from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from api.serializers import UsersSerializer, TicketsSerializer, NotificationsSerializer, ProblemsSerializer
from api.models import Users, Tickets, Notifications, Problems
from django.core.mail import send_mail
from helpdesk.settings import EMAIL_HOST_USER


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


class NotificationsViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Notifications.objects.all()
    serializer_class = NotificationsSerializer
    permission_classes = [permissions.AllowAny]

    def sendEmailNotification(self, request):
        if request.method == 'POST':
            recievers = []

            for user in Users.objects.all():
                recievers.append(user.email)

            print(queryset)

            # send_mail(queryset.notificationType,
            #           queryset.description, EMAIL_HOST_USER, recievers)


class ProblemsViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Problems.objects.all()
    serializer_class = ProblemsSerializer
    permission_classes = [permissions.AllowAny]
