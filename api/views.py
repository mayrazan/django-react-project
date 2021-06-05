from django.contrib.auth.models import User, Group
from rest_framework import permissions, status
from api.serializers import UsersSerializer, TicketsSerializer, NotificationsSerializer, ProblemsSerializer, FilesSerializer, CustomTokenObtainPairSerializer
from api.models import Users, Tickets, Notifications, Problems, Files
from django.core.mail import send_mail
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.views import APIView
from django.http.response import Http404
from django.http.multipartparser import MultiPartParser
from rest_framework_simplejwt.views import TokenObtainPairView


class TicketsView(APIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = TicketsSerializer
    # parser_classes = [MultiPartParser]

    def get_queryset(self):
        tickets = Tickets.objects.all().order_by('-openDate')
        return tickets

    def get(self, request):
        tickets = self.get_queryset()
        serializer = TicketsSerializer(tickets, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TicketsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        print(serializer.errors)
        return Response(serializer.data)


class TicketView(APIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = TicketsSerializer
    # parser_classes = [MultiPartParser]

    def get_object(self, pk):
        try:
            return Tickets.objects.get(pk=pk)
        except Tickets.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        ticket = self.get_object(pk)
        serializer = TicketsSerializer(ticket)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        ticket = self.get_object(pk)
        serializer = TicketsSerializer(ticket, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        ticket = self.get_object(pk)
        ticket.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def patch(self, request, pk):
        ticket = self.get_object(pk=pk)
        serializer = TicketsSerializer(ticket, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UsersView(APIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = UsersSerializer
    # parser_classes = [MultiPartParser]

    def get_queryset(self):
        users = Users.objects.all()
        return users

    def get(self, request, *args, **kwargs):
        users = self.get_queryset()
        serializer = UsersSerializer(users, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = UsersSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        print(serializer.errors)
        return Response(serializer.data)


class UserView(APIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = UsersSerializer
    # parser_classes = [MultiPartParser]

    def get_object(self, pk):
        try:
            return Users.objects.get(pk=pk)
        except Users.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        user = self.get_object(pk)
        serializer = UsersSerializer(user)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        user = self.get_object(pk)
        serializer = UsersSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        user = self.get_object(pk)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class NotificationsView(APIView):

    serializer_class = NotificationsSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        notifications = Notifications.objects.all()
        return notifications

    def get(self, request, *args, **kwargs):
        notifications = self.get_queryset()
        serializer = NotificationsSerializer(notifications, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = NotificationsSerializer(data=request.data)

        recievers = []
        if serializer.is_valid():
            serializer.save()
            serializer_data = request.POST.dict()
            notificationType = serializer_data.get("notificationType")
            description = serializer_data.get("description")

            for user in Users.objects.all():
                recievers.append(user.email)

            send_mail(notificationType, description,
                      'condominioquintahelpdesk@gmail.com', recievers)

        print(serializer.errors)
        return Response(serializer.data)


class ProblemsView(APIView):

    serializer_class = ProblemsSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        problems = Problems.objects.all()
        return problems

    def get(self, request, *args, **kwargs):
        problems = self.get_queryset()
        serializer = ProblemsSerializer(problems, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = ProblemsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        print(serializer.errors)
        return Response(serializer.data)


class FilesView(APIView):

    serializer_class = FilesSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        files = Files.objects.all()
        return files

    def get(self, request, *args, **kwargs):
        files = self.get_queryset()
        serializer = FilesSerializer(files, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = FilesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        print(serializer.errors)
        return Response(serializer.data)


class FileView(APIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = FilesSerializer
    # parser_classes = [MultiPartParser]

    def get_object(self, pk):
        try:
            return Files.objects.get(pk=pk)
        except Files.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        file = self.get_object(pk)
        serializer = FilesSerializer(file)
        return Response(serializer.data)

    def delete(self, request, pk, format=None):
        file = self.get_object(pk)
        file.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class CustomTokenObtainPairView(TokenObtainPairView):
    # Replace the serializer with your custom
    permission_classes = [permissions.AllowAny]
    serializer_class = CustomTokenObtainPairSerializer
