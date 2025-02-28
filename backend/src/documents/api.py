from typing import List
from ninja import Router

from helpers.api.auth.permissions import user_required

from .models import Doc
from .schemas import DocSchema

router = Router()


@router.get("/", response=List[DocSchema], auth=user_required)
def document_list_view(request):
    qs = Doc.objects.filter(user=request.user).values('id', 'content', 'title')
    return qs