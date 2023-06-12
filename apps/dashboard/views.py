"""
Views for dashboard api.
"""

import os

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

from core.models import Pdf
from dashboard.serializers import PdfSerializer


class UploadPdfView(APIView):
    """
    View for uploading a pdf.
    """

    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        """
        Upload a pdf.
        """

        if "file" not in request.FILES:
            return Response({"error": "No file was submitted."}, status=400)

        file = request.FILES["file"]

        pdf = Pdf.objects.create(
            name=os.path.splitext(file.name)[0],
            file=file,
            uploaded_by=request.user,
        )

        serialized_pdf = PdfSerializer(pdf)

        return Response(
            {"message": "File has been uploaded.", "pdf": serialized_pdf.data},
            status=200,
        )


class ListPdfView(APIView):
    """
    View for listing all pdfs.
    """

    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        """
        Get all pdfs.
        """

        pdfs = Pdf.objects.filter(uploaded_by=request.user).order_by(
            "-uploaded_at"
        )
        serializer = PdfSerializer(pdfs, many=True)

        return Response(serializer.data, status=200)


class DeletePdfView(APIView):
    """
    View for deleting a pdf.
    """

    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def delete(self, request, id, format=None):
        """
        Delete a pdf.
        """

        pdf = Pdf.objects.filter(id=id).first()
        pdf.delete()

        return Response({"message": "Pdf has been deleted."}, status=200)
