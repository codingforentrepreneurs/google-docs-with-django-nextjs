from datetime import datetime, timezone
from django.contrib.auth import get_user_model


User = get_user_model()

CKEDITOR_ENVIRONMENT_ID = "mOrAUyJPWgnlK37ARIKU"

def get_user_token(user_id):
    try:
        user_instance = User.objects.get(id=user_id)
    except Exception:
        raise Exception("User failed")

    username = f"{user_instance.display_name}"
    iat = int(datetime.now(timezone.utc).timestamp())
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