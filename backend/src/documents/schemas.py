import uuid
from ninja import Schema

# Schema -> Pydantic BaseModel

class DocSchema(Schema):
    id: uuid.UUID
    title: str
    content: str