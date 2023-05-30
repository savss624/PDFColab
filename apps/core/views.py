"""
Views for core.
"""

from django.shortcuts import redirect
from django.views.generic import TemplateView


def domain(request):
    return redirect("dashboard_page")


class InitTemplateView(TemplateView):
    """View for init template view."""

    def get_context_data(self, **kwargs):
        context = dict(**kwargs)
        context.update(
            {
                "theme": self.request.COOKIES.get("theme"),
            }
        )
        context["context"] = context.copy()
        return context


class Dashboard(InitTemplateView):
    """View react app for dashboard page."""

    template_name = "dashboard.html"
