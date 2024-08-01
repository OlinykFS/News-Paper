# authApp/urls.py
from django.urls import path, include
from rest_framework_simplejwt.views import TokenBlacklistView
from .views import UserProfileView

urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('api/logout/', TokenBlacklistView.as_view(), name='token_blacklist'),
    path('profile/', UserProfileView.as_view(), name='user-profile'),
]
