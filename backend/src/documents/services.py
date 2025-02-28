from django.core.cache import cache

from .models import Doc

DOC_CACHE_KEY = "documents:list:{user_id}"
DOC_CACHE_TIMEOUT = 300

def list_documents(user=None, force=False):
    if user is None:
        return []
    cache_key = DOC_CACHE_KEY.format(user_id=user.id)
    cached_qs = cache.get(cache_key)
    if cached_qs and not force:
        return cached_qs
    qs = Doc.objects.filter(user=user).values('id', 'content', 'title')
    cache.set(cache_key, qs, timeout=DOC_CACHE_TIMEOUT)
    return qs