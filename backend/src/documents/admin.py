from django.contrib import admin

# Register your models here.
from .models import Doc, DocUser


class DocUserInline(admin.TabularInline):
    model = DocUser
    extra = 0

class DocAdmin(admin.ModelAdmin):
    inlines = [DocUserInline]


admin.site.register(Doc, DocAdmin)