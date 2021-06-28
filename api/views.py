from django.contrib.auth.models import User, Group
from rest_framework import permissions, status
from api.serializers import NotificationsSerializer, ProblemsSerializer, TicketsFilterUserSerializer, TicketsSerializer, UsersSerializer, ColorPrioritySerializer, TicketsHistoryChangeSerializer
from api.models import Users, Tickets, Notifications, Problems, ColorPriority
from django.core.mail import send_mail
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.views import APIView
from django.http.response import Http404
from django.http.multipartparser import MultiPartParser
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from django_filters import rest_framework as filters
from rest_framework import viewsets


class TicketsView(APIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = TicketsSerializer

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

            subject = "Seu ticket foi atualizado"
            description = "Seu ticket nº" + \
                str(serializer.data['id']) + \
                " foi atualizado, para mais detalhes visite: https://help-desk-seven.vercel.app/"
            to_email = serializer.data['user_email']

            # send_mail("Ticket atualizado pelo usuário", "O ticket " + str(serializer.data['id']) + " recebeu uma resposta do usuário " + serializer.data['user_email'] + ", para mais detalhes visite: https://help-desk-seven.vercel.app/",
            #           to_email, ['condominioquintahelpdesk@gmail.com'])
            send_mail(subject, description,
                      'condominioquintahelpdesk@gmail.com', [to_email])

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

            subject = "Seu ticket foi atualizado"
            description = "Seu ticket nº" + \
                str(serializer.data['id']) + \
                " foi atualizado, para mais detalhes visite: https://help-desk-seven.vercel.app/"
            to_email = serializer.data['user_email']

            # send_mail("Ticket atualizado pelo usuário", "O ticket " + str(serializer.data['id']) + " recebeu uma resposta do usuário " + serializer.data['user_email'] + ", para mais detalhes visite: https://help-desk-seven.vercel.app/",
            #           to_email, ['condominioquintahelpdesk@gmail.com'])

            send_mail(subject, description,
                      'condominioquintahelpdesk@gmail.com', [to_email])

            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TicketsUserListView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = TicketsFilterUserSerializer

    def get_queryset(self):
        queryset = Tickets.objects.filter(user_id=self.kwargs['pk'])
        return queryset


class UsersView(APIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = UsersSerializer

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

    def patch(self, request, pk):
        user = self.get_object(pk=pk)
        serializer = UsersSerializer(user, data=request.data, partial=True)
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

            notificationType = request.data['notificationType']
            description = request.data['description']

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


class ProblemView(APIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ProblemsSerializer

    def get_object(self, pk):
        try:
            return Problems.objects.get(pk=pk)
        except Problems.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        problem = self.get_object(pk)
        serializer = ProblemsSerializer(problem)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        problem = self.get_object(pk)
        serializer = ProblemsSerializer(problem, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        problem = self.get_object(pk)
        problem.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ColorsPriorityView(APIView):

    serializer_class = ColorPrioritySerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        colors = ColorPriority.objects.all()
        return colors

    def get(self, request, *args, **kwargs):
        colors = self.get_queryset()
        serializer = ColorPrioritySerializer(colors, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = ColorPrioritySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        print(serializer.errors)
        return Response(serializer.data)


class ColorView(APIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ColorPrioritySerializer

    def get_object(self, pk):
        try:
            return ColorPriority.objects.get(pk=pk)
        except ColorPriority.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        colors = self.get_object(pk)
        serializer = ColorPrioritySerializer(colors)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        colors = self.get_object(pk)
        serializer = ColorPrioritySerializer(colors, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        colors = self.get_object(pk)
        colors.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class TicketsHistoryChangeView(APIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = TicketsHistoryChangeSerializer

    def get_queryset(self):
        tickets = Tickets.history.all().order_by('-id')
        return tickets

    def get(self, request):
        tickets = self.get_queryset()
        serializer = TicketsHistoryChangeSerializer(tickets, many=True)
        return Response(serializer.data)


class TicketHistoryChangeView(APIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = TicketsHistoryChangeSerializer

    def get_object(self, id):
        try:
            return Tickets.history.filter(id=id)
        except Tickets.DoesNotExist:
            raise Http404

    def get(self, request, id, format=None):
        tickets = self.get_object(id)
        serializer = TicketsHistoryChangeSerializer(tickets, many=True)
        return Response(serializer.data)

    def delete(self, request, id, format=None):
        tickets = self.get_object(id)
        tickets.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
