from django.contrib import admin
from django.urls import path, include

from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('blogApp.urls')),
]
