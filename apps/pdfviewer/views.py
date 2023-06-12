"""
Views for pdfviewer api.
"""

import os

from django.conf import settings
from django.http import FileResponse
from django.template.loader import render_to_string
from django.core.mail import send_mail
from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response

from core.models import Pdf, SharedPdf, Comment

from pdfviewer.serializers import (
    SharedPdfSerializer,
    CommentSerializer,
)


class PdfFileView(APIView):
    """
    View for getting pdf file.
    """

    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, id, format=None):
        """
        Get pdf file.
        """

        pdf = Pdf.objects.get(id=id)

        pdf_path = os.path.join(
            settings.MEDIA_ROOT, pdf.file.url.removeprefix("/media/")
        )
        pdf = open(pdf_path, "rb")
        return FileResponse(pdf, content_type="application/pdf")


class SharedPdfFileView(APIView):
    """
    View for getting shared pdf file.
    """

    def get(self, request, id, format=None):
        """
        Get shared pdf file.
        """

        shared_pdf = SharedPdf.objects.get(id=id)
        pdf = shared_pdf.pdf
        pdf_path = os.path.join(
            settings.MEDIA_ROOT, pdf.file.url.removeprefix("/media/")
        )
        pdf = open(pdf_path, "rb")
        return FileResponse(pdf, content_type="application/pdf")


class InviteViewerView(APIView):
    """
    View for inviting a viewer.
    """

    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        """
        Invite a viewer.
        """

        pdf = Pdf.objects.get(id=request.data["pdfId"])
        User = get_user_model()
        user = User.objects.filter(email=request.data["email"])
        if user:
            shared_to = user[0]
        else:
            shared_to = User.objects.create(
                email=request.data["email"],
                name=request.data["name"],
                is_external=True,
            )
        shared_by = request.user

        if shared_to.email == shared_by.email:
            return Response(
                {"message": "You cannot invite yourself."}, status=400
            )

        shared_pdf = SharedPdf.objects.create(
            pdf=pdf,
            shared_to=shared_to,
            shared_by=shared_by,
        )

        current_domain = request.META["HTTP_HOST"]
        invitation_link = (
            f"http://{current_domain}/pdfviewer/shared/{shared_pdf.id}"
        )

        subject = "PDFColab Invitation"
        message = f"Hi {request.user.name}"
        email_from = settings.EMAIL_HOST_USER
        recipient_list = [
            shared_to.email,
        ]

        html_message = render_to_string(
            "mail/pdfcolab_invitation.html",
            {
                "recipient_name": shared_to.name,
                "pdf_owner_name": request.user.name,
                "project_name": pdf.name,
                "invitation_link": invitation_link,
            },
        )

        send_mail(
            subject,
            message,
            email_from,
            recipient_list,
            html_message=html_message,
        )

        return Response({"sharedId": shared_pdf.id})


class SharedViewersView(APIView):
    """
    View for shared viewers.
    """

    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        """
        Get all invited viewers.
        """

        pdf_id = request.GET.get("pdf_id")
        shared_pdfs = SharedPdf.objects.filter(pdf__id=pdf_id).order_by(
            "-shared_at"
        )
        serializer = SharedPdfSerializer(shared_pdfs, many=True)
        return Response({"viewers": serializer.data})


class RevokeAccessView(APIView):
    """
    View for revoking access.
    """

    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def delete(self, request, id, format=None):
        shared_pdf = SharedPdf.objects.filter(id=id).first()
        shared_pdf.delete()

        return Response({"message": "Viewer has been deleted."}, status=200)


class AddCommentView(APIView):
    """
    View for comments.
    """

    def post(self, request, format=None):
        """
        Post a comment.
        """

        pdf = Pdf.objects.get(id=request.data["pdfId"])
        comment = request.data["comment"]
        email = request.data["email"]
        parent_comment_id = request.data["parentCommentId"]
        parent_comment = (
            Comment.objects.get(id=parent_comment_id)
            if parent_comment_id
            else None
        )
        commented_by = get_user_model().objects.get(email=email)
        comment = Comment.objects.create(
            pdf=pdf,
            comment_text=comment,
            parent_comment=parent_comment,
            commented_by=commented_by,
        )
        serializer = CommentSerializer(comment)

        return Response(serializer.data)


class ListCommentsView(APIView):
    """
    View for listing comments.
    """

    def get(self, request, format=None):
        """
        Get all comments along with replies.
        """

        pdf_id = request.GET.get("pdf_id")
        pdf = Pdf.objects.get(id=pdf_id)
        parent_comment_id = request.GET.get("parent_comment_id", None)
        comments_queryset = Comment.objects.filter(
            pdf=pdf, parent_comment__id=parent_comment_id
        ).order_by("-commented_at")

        pagination_limit = 5

        last_comment_id = request.GET.get("last_comment_id", None)
        if last_comment_id:
            comments_queryset = comments_queryset.filter(
                commented_at__lt=Comment.objects.get(
                    id=last_comment_id
                ).commented_at
            )

        if len(comments_queryset) > pagination_limit:
            comments_queryset = comments_queryset[:pagination_limit]
            has_more = True
        else:
            comments_queryset = comments_queryset
            has_more = False

        serializer = CommentSerializer(comments_queryset, many=True)

        return Response({"comments": serializer.data, "has_more": has_more})


class DeleteCommentView(APIView):
    """
    View for deleting a comment.
    """

    def delete(self, request, id, format=None):
        """
        Delete a comment.
        """

        comment = Comment.objects.filter(id=id).first()
        comment.delete()

        return Response({"message": "Comment has been deleted."}, status=200)
