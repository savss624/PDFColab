"""
Views for dashboard api.
"""

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from core.models import UserWaitlist


class BetaUserWaitlistAPIView(APIView):
    """
    Beta user waitlist API view.
    """

    def post(self, request, format=None):
        """
        Add beta user to waitlist.
        """

        email = request.data.get("email")
        name = request.data.get('name')
        if email:
            email = email.lower().strip()
            _, created = UserWaitlist.objects.get_or_create(
                name=name, email=email, feature="beta-release"
            )
            if created:
                return Response(
                    {"message": "User added to the waitlist."},
                    status=status.HTTP_201_CREATED,
                )
            else:
                return Response(
                    {"message": "User already exists in the waitlist."},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        else:
            return Response(
                {"message": "Email field is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )
