from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from . import views
from django.conf.urls import url, re_path


# app_name will help us do a reverse look-up latter.
urlpatterns = [
    path('tickets/', views.TicketsView.as_view()),
    path('tickets/<int:pk>/', views.TicketView.as_view()),
    path('tickets/users/<int:pk>/',
         views.TicketsUserListView.as_view()),
    path('users/', views.UsersView.as_view()),
    path('users/<int:pk>/', views.UserView.as_view()),
    path('problems/', views.ProblemsView.as_view()),
    path('problems/<int:pk>', views.ProblemView.as_view()),
    path('notifications/', views.NotificationsView.as_view()),
    path('colors/', views.ColorsPriorityView.as_view()),
    path('colors/<int:pk>', views.ColorView.as_view()),
]
