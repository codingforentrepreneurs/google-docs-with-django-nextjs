from ninja import Schema


class GoogleLoginSchema(Schema):
    redirect_url: str


class GoogleCallbackSchema(Schema):
    code: str
    state: str