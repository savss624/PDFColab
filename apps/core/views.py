"""
Views for core.
"""

from django.shortcuts import redirect
from django.views.generic import TemplateView

from core.models import Pdf, SharedPdf


class InitTemplateView(TemplateView):
    """
    View for init template view.
    """

    def get_context_data(self, **kwargs):
        """
        Send context data to react app.
        """

        context = dict(**kwargs)
        context.update(
            {
                "authToken": self.request.COOKIES.get("authToken"),
            }
        )
        context["context"] = context.copy()
        return context


class Authentication(InitTemplateView):
    """
    View react app for dashboard page.
    """

    template_name = "authentication.html"

    def get_context_data(self, **kwargs):
        """
        Send context data to react app.
        """

        context = dict()
        context["isAuthPage"] = True
        context["authMode"] = "signin"
        return super().get_context_data(**context)

    def get(self, request, *args, **kwargs):
        """
        Check if user is already logged in.
        """

        isLogout = request.GET.get("logout", False)
        if not isLogout and request.COOKIES.get("authToken"):
            return redirect("dashboard_page")
        return super().get(request, *args, **kwargs)


class ResetPassword(InitTemplateView):
    """
    View react app for reset password page.
    """

    template_name = "authentication.html"

    def get_context_data(self, **kwargs):
        """
        Send context data to react app.
        """

        context = dict()
        context["isAuthPage"] = True
        context["authMode"] = "resetpassword"
        return super().get_context_data(**context)

    def get(self, request, *args, **kwargs):
        """
        Check if user is already logged in.
        """

        token = request.GET.get("token", None)
        if not token:
            return redirect("authentication_page")
        return super().get(request, *args, **kwargs)


class Dashboard(InitTemplateView):
    """
    View react app for dashboard page.
    """

    template_name = "dashboard.html"


class PdfViewer(InitTemplateView):
    """
    View react app for pdf viewer page.
    """

    template_name = "pdfviewer.html"

    def get_context_data(self, **kwargs):
        """
        Send context data to react app.
        """

        context = dict()
        pdf_id = self.kwargs.get("pdfId")
        if pdf_id == "null":
            return
        context["pdfId"] = pdf_id
        pdf = Pdf.objects.get(id=pdf_id)
        context["pdfName"] = pdf.name
        context["uploadedBy"] = {
            "name": pdf.uploaded_by.name,
            "email": pdf.uploaded_by.email,
        }
        return super().get_context_data(**context)


class SharedPdfViewer(InitTemplateView):
    """
    View react app for shared pdf viewer page.
    """

    template_name = "pdfviewer.html"

    def get_context_data(self, **kwargs):
        """
        Send context data to react app.
        """

        context = dict()
        shared_id = self.kwargs.get("sharedId")
        if shared_id == "null":
            return
        try:
            pdf = SharedPdf.objects.get(id=shared_id).pdf
        except SharedPdf.DoesNotExist:
            return
        context["pdfId"] = pdf.id
        context["pdfName"] = pdf.name
        context["isPdfShared"] = True
        context["sharedId"] = shared_id
        sharedPdf = SharedPdf.objects.get(id=shared_id)
        context["sharedToUser"] = {
            "name": sharedPdf.shared_to.name,
            "email": sharedPdf.shared_to.email,
        }
        return super().get_context_data(**context)

    def get(self, request, *args, **kwargs):
        """
        Check if shared access is revoked.
        """

        try:
            shared_id = self.kwargs.get("sharedId")
            SharedPdf.objects.get(id=shared_id)
        except SharedPdf.DoesNotExist:
            return redirect("access_revoked_page")
        return super().get(request, *args, **kwargs)


class AccessRevoked(TemplateView):
    """
    View for access revoked page.
    """

    template_name = "access_revoked.html"
