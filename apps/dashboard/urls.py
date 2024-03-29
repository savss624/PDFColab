"""
URL Mapping for the dashboard app.
"""

from django.urls import path

from dashboard import views

app_name = "dashboard"

urlpatterns = [
    path("uploadpdf/", views.UploadPdfView.as_view(), name="upload_pdf"),
    path("listpdf/", views.ListPdfView.as_view(), name="pdf_list"),
    path(
        "deletepdf/<str:id>/", views.DeletePdfView.as_view(), name="delete_pdf"
    ),
]
