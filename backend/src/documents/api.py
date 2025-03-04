from typing import List
from ninja import Router
from ninja.errors import HttpError

from helpers.api.auth.permissions import user_required

from .models import Doc
from .schemas import DocSchema
from . import exceptions as doc_exceptions
from . import services as doc_services

router = Router()


@router.get("/", response=List[DocSchema], auth=user_required)
def document_list_view(request):
    qs = doc_services.list_documents(request.user)
    return qs


@router.get("/{document_id}/", response=DocSchema, auth=user_required)
def document_detail_view(request, document_id): 
    try:
        obj = doc_services.get_document(user=request.user, document_id=document_id)
    except doc_exceptions.DocumentNotFound as e:
        raise HttpError(404, f"{e}")
    except doc_exceptions.UserNoPermissionNotAllowed as e:
        raise HttpError(403, f"{e}")
    except:
        raise HttpError(500, "Unknown server error")
    if obj is None:
        raise HttpError(404, f"{document_id} is not found")
    return obj