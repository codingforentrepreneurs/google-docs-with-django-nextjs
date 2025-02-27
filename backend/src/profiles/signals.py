from django.db.models.signals import post_save
from django.dispatch import receiver

from django.conf import settings
from .models import Profile

User = settings.AUTH_USER_MODEL # "auth.User"


@receiver(post_save, sender=User)
def create_user_profile_post_save(sender, instance, created, *args, **kwargs):
    if created:
        Profile.objects.get_or_create(user=instance)