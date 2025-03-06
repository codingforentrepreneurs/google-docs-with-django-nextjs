from django.db.models import Q
from django.core.cache import cache

from . import exceptions
from .models import Doc

DOC_CACHE_KEY = "documents:list:{user_id}"
DOC_CACHE_TIMEOUT = 300


def create_document(user=None, title=None):
    if user is None or title is None:
        return None
    return Doc.objects.create(user=user, title=title)


def list_documents(user=None, force=False):
    if user is None:
        return []
    cache_key = DOC_CACHE_KEY.format(user_id=user.id)
    cached_qs = cache.get(cache_key)
    if cached_qs and not force:
        return cached_qs
    qs = Doc.objects.filter(
        Q(user=user) |
        Q(docuser__user=user)
    ).values('id', 'content', 'title')
    cache.set(cache_key, qs, timeout=DOC_CACHE_TIMEOUT)
    return qs

def get_document(user=None, document_id=None):
    if user is None or document_id is None:
        return None
    try:
        obj = Doc.objects.get(id=document_id)
    except Doc.DoesNotExist:
        raise exceptions.DocumentNotFound(f"{document_id} not found.")
    except:
        raise exceptions.DocumentNotFound(f"{document_id} not found.")
    is_owner = obj.user == user
    is_doc_user = obj.docuser_set.filter(user=user, active=True).exists()
    has_permission = is_owner or is_doc_user
    if not has_permission:
        raise exceptions.UserNoPermissionNotAllowed(f"{user} needs access.")
    return obj