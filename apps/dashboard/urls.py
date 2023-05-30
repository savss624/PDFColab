"""
URL Mapping for the dashboard app.
"""

from django.urls import path

from dashboard.views import BetaUserWaitlistAPIView

urlpatterns = [
    path("beta-user-waitlist/", BetaUserWaitlistAPIView.as_view()),
]
