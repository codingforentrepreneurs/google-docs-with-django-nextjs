import uuid
from django.conf import settings
from django.db import models
from django.utils import timezone

# Create your models here.

User = settings.AUTH_USER_MODEL

class Doc(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, db_index=True, editable=False)
    user = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
    title = models.CharField(max_length=120, blank=True, null=True)
    content = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class DocUser(models.Model):
    doc = models.ForeignKey(Doc, null=True, on_delete=models.SET_NULL)
    user = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
    active = models.BooleanField(default=True)
    inactive_at = models.DateTimeField(auto_now=False, auto_now_add=False, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.active and self.inactive_at is None:
            self.inactive_at = timezone.now()
        super().save(*args, **kwargs)