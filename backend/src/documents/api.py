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


@router.get("/{document_id}/", response=DocSchema, auth=user_required)
def document_detail_view(request, document_id):
    print(document_id)
    qs = doc_services.list_documents(request.user)
    return qs[0]