from django.conf import settings
from django.db import models

User = settings.AUTH_USER_MODEL # "auth.User"

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(blank=True, null=True)