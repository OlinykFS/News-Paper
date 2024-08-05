from django.urls import path
from .views import PostListCreateView, PostDetailView, UserPostsView

urlpatterns = [
    path('posts/', PostListCreateView.as_view(), name='post-list-create'),
    path('posts/<int:pk>/', PostDetailView.as_view(), name='post-detail'),
    path('my-posts/', UserPostsView.as_view(), name='user-posts'),
]
