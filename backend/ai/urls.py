from django.urls import path
from . import views

urlpatterns = [
    path('process/', views.process_posts, name='process_posts'),
    path('stats/', views.get_stats, name='get_stats'),
]