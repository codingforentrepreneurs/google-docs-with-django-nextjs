import uuid
from ninja import Schema, Field

# Schema -> Pydantic BaseModel

class DocSchema(Schema):
    id: uuid.UUID
    title: str
    content: str | None = Field(default="")


class DocCreateSchema(Schema):
    title: str

class DocUpdateSchema(Schema):
    title: str
    content: str