# Application definition
DJANGO_INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django.contrib.sites",
]


THIRD_PARTY_INSTALLED_APPS = [
    "corsheaders",
    "ninja",
    "ninja_extra",
    "ninja_jwt",
]

MY_APPS = [
    "accounts",
    "documents",
    "profiles"
]


INSTALLED_APPS = list(set(DJANGO_INSTALLED_APPS + THIRD_PARTY_INSTALLED_APPS + MY_APPS))
