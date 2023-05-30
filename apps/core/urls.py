"""
Core URL mappings.
"""
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from django.contrib import admin
from django.urls import path, include
from . import views
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/schema/", SpectacularAPIView.as_view(), name="api-schema"),
    path(
        "api/docs/",
        SpectacularSwaggerView.as_view(url_name="api-schema"),
        name="api-docs",
    ),
    path("", views.domain, name="domain_url"),
    path("api/user/", include("user.urls"), name="user_model_apis"),
    path("dashboard", views.Dashboard.as_view(), name="dashboard_page"),
    path("api/dashboard/", include("dashboard.urls"), name="dashboard_apis"),
]

if settings.DEBUG:
    """
    Mimicing behaviour of staticfiles urlpatterns for mediafiles as well
    in development server as mediafiles are not managed by default.
    """
    urlpatterns += static(
        settings.MEDIA_URL, document_root=settings.MEDIA_ROOT
    )

    # Adding url pattern for django debug toolbar
    urlpatterns.append(path("__debug__/", include("debug_toolbar.urls")))
