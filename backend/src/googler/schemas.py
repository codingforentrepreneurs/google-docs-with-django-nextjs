from ninja import Schema


class GoogleLoginSchema(Schema):
    redirect_url: str
