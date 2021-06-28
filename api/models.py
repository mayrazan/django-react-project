from django.db import models
from gdstorage.storage import GoogleDriveFilePermission, GoogleDrivePermissionRole, GoogleDrivePermissionType, GoogleDriveStorage
from django.contrib.auth.models import (
    AbstractBaseUser, PermissionsMixin, BaseUserManager
)
from django.contrib.auth.hashers import make_password
from simple_history.models import HistoricalRecords

permission = GoogleDriveFilePermission(
    GoogleDrivePermissionRole.WRITER,
    GoogleDrivePermissionType.ANYONE
)

# Define Google Drive Storage
gd_storage = GoogleDriveStorage(permissions=(permission, ))

# Create your models here.


class UserManager(BaseUserManager):
    def create_user(self, email, password, numAp, name, lastName, phone, alias=None):
        user = self.model(
            email=self.normalize_email(email), numAp=numAp, name=name, lastName=lastName, phone=phone,)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email,  password, numAp, name, lastName, phone):
        user = self.create_user(email,
                                password, numAp, name, lastName, phone)
        user.is_staff = True
        user.is_superuser = True
        user.isAdmin = True
        user.isUser = False
        user.save()
        return user


class Users(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(null=False, max_length=255, unique=True)
    name = models.CharField(max_length=100)
    lastName = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    numAp = models.IntegerField()
    floor = models.IntegerField(blank=True, null=True)
    password = models.CharField(max_length=255)
    cpf = models.CharField(max_length=11, blank=True)
    phone = models.CharField(max_length=11)
    isUser = models.BooleanField(default=True)
    isAdmin = models.BooleanField(default=False)

    objects = UserManager()
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["password", "numAp",
                       "name", "lastName", "phone", ]

    def __str__(self):
        return self.email


class Problems(models.Model):
    problemType = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.problemType


class Tickets(models.Model):

    STATUS_CHOICES = [
        ('Em aberto', 'Em aberto'),
        ('Em análise', 'Em análise'),
        ('Concluído', 'Concluído'),
        ('Rejeitado', 'Rejeitado'),
    ]
    PRIORITY_CHOICES = [
        ('Baixa', 'Baixa'),
        ('Media', 'Media'),
        ('Alta', 'Alta'),
    ]
    user = models.ForeignKey(
        Users, on_delete=models.CASCADE, null=True, blank=True, related_name='user')
    problem = models.ForeignKey(
        Problems, on_delete=models.CASCADE, to_field='problemType')
    status = models.CharField(choices=STATUS_CHOICES,
                              default='Em aberto', max_length=50)
    priority = models.CharField(
        choices=PRIORITY_CHOICES, max_length=50, default='Baixa')
    numApOccurrence = models.IntegerField()
    description = models.TextField()
    feedbackManager = models.TextField(blank=True)
    openDate = models.DateTimeField(auto_now_add=True)
    files = models.FileField(upload_to='helpdesk/',
                             storage=gd_storage, blank=True, null=True)
    userResponse = models.TextField(blank=True, null=True)
    history = HistoricalRecords()

    def __str__(self):
        return str(self.problem)


class Notifications(models.Model):
    NOTIFICATION_CHOICES = [
        ('Manutenção', 'Manutenção'),
        ('Mudança', 'Mudança'),
        ('Reunião', 'Reunião'),
        ('Informações Gerais', 'Informações Gerais'),
        ('Outros', 'Outros')
    ]
    notificationType = models.CharField(choices=NOTIFICATION_CHOICES,
                                        default='Informações Gerais', max_length=50)
    description = models.TextField()
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.notificationType


class ColorPriority(models.Model):
    lowPriority = models.CharField(max_length=30, default='#08c70b')
    mediumPriority = models.CharField(max_length=30, default='#eda915')
    highPriority = models.CharField(max_length=30, default='#ff0000')
