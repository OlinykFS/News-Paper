from django.contrib import admin
from .models import PostLink, Post

@admin.register(PostLink)
class PostLinkAdmin(admin.ModelAdmin):
    list_display = ('url', 'created_at')

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_at', 'processed')
