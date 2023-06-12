"""
Serializers for pdfviewer app.
"""

from rest_framework import serializers

from core.models import SharedPdf, Comment
from user.serializers import UserSerializer


class SharedPdfSerializer(serializers.ModelSerializer):
    """
    Serializer for SharedPdf model.
    """

    shared_to = UserSerializer()

    class Meta:
        model = SharedPdf
        fields = ("id", "shared_to")


class CommentSerializer(serializers.ModelSerializer):
    """
    Serializer for Comment model.
    """

    commented_by = UserSerializer()

    class Meta:
        model = Comment
        fields = (
            "id",
            "comment_text",
            "parent_comment",
            "commented_by",
        )
