from rest_framework import serializers
from .models import Post
from authApp.serializers import UserSerializer

class PostSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'author', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

    def create(self, validated_data):
        user = self.context['request'].user
        post = Post.objects.create(author=user, **validated_data)
        return post
