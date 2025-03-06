import jwt # django-ninja
from datetime import datetime, timezone
from django.conf import settings
from django.contrib.auth import get_user_model
from helpers.api.auth.permissions import user_required


from ninja import Router 

User = get_user_model()

CKEDITOR_ENVIRONMENT_ID = "mOrAUyJPWgnlK37ARIKU"

def get_user_token(user_id):
    try:
        user_instance = User.objects.get(id=user_id)
    except Exception:
        raise Exception("User failed")

    username = f"{user_instance.display_name}"
    iat = int(datetime.now(timezone.utc).timestamp())
    algo = "HS256"
    headers = {
        "typ": "JWT",
        "alg": algo
    }
    payload = {
        "aud": f"{CKEDITOR_ENVIRONMENT_ID}",
        "iat": iat,
        "sub": username,
        "user": {
            "email": f"{user_instance.email}",
            "name": f"{user_instance.display_name}",
        },
        "auth": {
            "collaboration": {
                "*": {
                    "role": "writer"
                }
            }
        }
    }
    signed_token = jwt.encode(
        payload=payload,
        key=settings.CKEDITOR_ACCESS_CREDS,
        algorithm=algo,
        headers=headers,
    )
    return signed_token

# users are required
router = Router(auth=user_required)


@router.get("/ckeditor/token")
def ckeditor_token_view(request):
    user = request.user
    token = get_user_token(user.id)
    return {"token": token}