from django.urls import path
from .views import hello_world, bye_world

urlpatterns = [
    path('hello/', hello_world, name='hello_world'),
    path('bye/', bye_world, name='bye_world'),
]