"""
URL Mapping for the pdfviewer app.
"""

from django.urls import path

from pdfviewer import views

app_name = "pdfviewer"

urlpatterns = [
    path("getpdf/<str:id>/", views.PdfFileView.as_view(), name="get_pdf"),
    path(
        "getsharedpdf/<str:id>/",
        views.SharedPdfFileView.as_view(),
        name="get_shared_pdf",
    ),
    path("inviteviewer/", views.InviteViewerView.as_view(), name="invite"),
    path(
        "getsharedviewers/",
        views.SharedViewersView.as_view(),
        name="viewers",
    ),
    path(
        "revokeaccess/<str:id>/",
        views.RevokeAccessView.as_view(),
        name="revoke",
    ),
    path("addcomment/", views.AddCommentView.as_view(), name="add_comment"),
    path(
        "getcomments/",
        views.ListCommentsView.as_view(),
        name="get_comments",
    ),
    path(
        "deletecomment/<str:id>/",
        views.DeleteCommentView.as_view(),
        name="delete_comment",
    ),
]
