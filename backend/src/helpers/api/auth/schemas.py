import re

from django.contrib.auth import get_user_model
from django.core.validators import EmailValidator
from ninja import Schema
from ninja.errors import HttpError


class BaseUserSchema(Schema):
    """Base schema with common validation methods"""

    @staticmethod
    def validate_username(value: str | None) -> str | None:
        if value is None:
            return None
        if len(value) < 3:
            raise HttpError(400, "Username must be at least 3 characters long")
        if not re.match("^[a-zA-Z0-9_]+$", value):
            raise HttpError(
                400, "Username can only contain letters, numbers, and underscores"
            )
        return value

    @staticmethod
    def validate_email(value: str | None) -> str | None:
        if value is None:
            return None
        email_validator = EmailValidator()
        try:
            email_validator(value)
        except:
            raise HttpError(400, "Invalid email address")
        return value

    @staticmethod
    def validate_password(value: str) -> str:
        if len(value) < 8:
            raise HttpError(400, "Password must be at least 8 characters long")
        if not any(c.isupper() for c in value):
            raise HttpError(400, "Password must contain at least one uppercase letter")
        if not any(c.islower() for c in value):
            raise HttpError(400, "Password must contain at least one lowercase letter")
        if not any(c.isdigit() for c in value):
            raise HttpError(400, "Password must contain at least one number")
        return value

    def check_availability(self, username: str | None, email: str | None) -> None:
        User = get_user_model()
        conditions = []

        if username:
            conditions.append(User.objects.filter(username__iexact=username).exists())
        if email:
            conditions.append(User.objects.filter(email__iexact=email).exists())

        if any(conditions):
            raise HttpError(
                400, "Username and/or email are not available. Please try again"
            )


class BaseRegistrationSchema(BaseUserSchema):
    """Base registration schema with common password validation"""

    password: str
    confirm_password: str

    def validate(self, data: dict) -> dict:
        if data["password"] != data["confirm_password"]:
            raise HttpError(400, "Passwords do not match")
        self.check_availability(username=data.get("username"), email=data.get("email"))
        return data


class UsernameOnlySchema(BaseRegistrationSchema):
    username: str


class EmailOnlySchema(BaseRegistrationSchema):
    email: str


class UsernameMandatoryEmailOptionalSchema(BaseRegistrationSchema):
    username: str
    email: str | None = None


class EmailMandatoryUsernameOptionalSchema(BaseRegistrationSchema):
    username: str | None = None
    email: str


class UsernameMandatoryEmailMandatorySchema(BaseRegistrationSchema):
    username: str
    email: str



class EmailLoginSchema(BaseUserSchema):
    email: str
    password: str