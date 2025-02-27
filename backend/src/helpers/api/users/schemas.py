from ninja import Schema


class UserSchema(Schema):
    username: str  | None
    email: str
    is_authenticated: bool
    access_token: str | None
    refresh_token: str | None
