from django.contrib import admin
from .models import Post


class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'created_at', 'updated_at')
    list_filter = ('author', 'created_at')
    search_fields = ('title', 'content')
    list_editable = ('title',) 
    list_display_links = ('author', 'created_at', 'updated_at')

    fieldsets = (
        (None, {'fields': ('title', 'content')}),
        ('Author Information', {'fields': ('author',)}),
        ('Dates', {'fields': ('created_at', 'updated_at')}),
    )

    readonly_fields = ('created_at', 'updated_at')


admin.site.register(Post, PostAdmin)
