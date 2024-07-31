from rest_framework import viewsets
from parserapp.models import Post
from blogApp.utils.serializers import PostSerializer

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by('-created_at')
    serializer_class = PostSerializer
