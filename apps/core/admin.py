"""
Django admin customization
"""
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _

from core import models


class UserAdmin(BaseUserAdmin):
    """Define the admin page for users."""

    ordering = ["id"]
    list_display = ["email", "name"]
    fieldsets = (
        (
            None,
            {
                "fields": ("email", "password"),
            },
        ),
        (_("Personal Info"), {"fields": ("name",)}),
        (
            _("Permissions"),
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "is_external",
                )
            },
        ),
        (_("Important Dates"), {"fields": ("last_login",)}),
    )
    readonly_fields = ["last_login"]
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "email",
                    "password1",
                    "password2",
                    "name",
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "is_external",
                ),
            },
        ),
    )


admin.site.register(models.User, UserAdmin)
admin.site.register(models.ResetPasswordToken)
admin.site.register(models.Pdf)
admin.site.register(models.SharedPdf)
admin.site.register(models.Comment)
