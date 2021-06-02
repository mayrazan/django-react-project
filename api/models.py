from django.db import models
from gdstorage.storage import GoogleDriveStorage

# Define Google Drive Storage
gd_storage = GoogleDriveStorage()

# Create your models here.


class Users(models.Model):
    name = models.CharField(max_length=100)
    lastName = models.CharField(max_length=100)
    avatar = models.ImageField(upload_to='helpdesk/', storage=gd_storage)
    numAp = models.IntegerField()
    floor = models.IntegerField()
    email = models.EmailField()
    password = models.CharField(max_length=20)
    cpf = models.CharField(max_length=11)
    phone = models.CharField(max_length=11)
    isUser = models.BooleanField()
    isAdmin = models.BooleanField()


class Tickets(models.Model):
    STATUS_CHOICES = [
        ('AB', 'Em aberto'),
        ('AN', 'Em análise'),
        ('CO', 'Concluído'),
        ('RE', 'Rejeitado'),
    ]
    PRIORITY_CHOICES = [
        ('BA', 'Baixa'),
        ('ME', 'Media'),
        ('AL', 'Alta'),
    ]
    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    files = models.FileField(upload_to='helpdesk/', storage=gd_storage)
    problem = models.CharField(max_length=50)
    status = models.CharField(choices=STATUS_CHOICES,
                              default='AB', max_length=2)
    priority = models.CharField(choices=PRIORITY_CHOICES, max_length=2)
    numApOccurrence = models.IntegerField()
    description = models.TextField()
    feedbackManager = models.TextField()
    openDate = models.DateTimeField(auto_now_add=True)
