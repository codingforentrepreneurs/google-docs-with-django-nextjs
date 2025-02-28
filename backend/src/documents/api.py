from typing import List
from ninja import Router

from helpers.api.auth.permissions import user_required

from .models import Doc
from .schemas import DocSchema
from . import services as doc_services

router = Router()


@router.get("/", response=List[DocSchema], auth=user_required)
def document_list_view(request):
    qs = doc_services.list_documents(request.user)
    return qs