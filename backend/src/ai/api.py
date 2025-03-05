from typing import Optional, Any
from ninja import Schema, Router
import random
import time
from helpers.api.auth.permissions import user_required

router = Router(auth=user_required)

class AIPayload(Schema):
    query: str
    context: Optional[Any]


# /api/ai/
@router.post("/")
def ai_echo_view(request, payload: AIPayload):
    # openai
    # claude
    # langchain
    # langgraph
    # pydantic ai
    # python -> llm
    sleep_for = 3.0 * ((random.randint(1,20) / 10))
    time.sleep(sleep_for)
    print(payload.query, payload.context, type(payload.context))
    return {"message": f"AI Says: {payload.query}"}