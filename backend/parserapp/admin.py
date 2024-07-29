from django.contrib import admin
from .models import PostLink, Post
from django_celery_beat.models import PeriodicTask, IntervalSchedule
import json

def setup_periodic_tasks():
    schedule, created = IntervalSchedule.objects.get_or_create(
        every=1,
        period=IntervalSchedule.HOURS,
    )

    PeriodicTask.objects.create(
        interval=schedule,
        name='Parse links every hour',
        task='parserapp.tasks.parse_links',
    )

    PeriodicTask.objects.create(
        interval=schedule,
        name='Parse content every hour',
        task='parserapp.tasks.parse_content',
    )

class PostAdmin(admin.ModelAdmin):
    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)
        setup_periodic_tasks()

admin.site.register(PostLink)
admin.site.register(Post, PostAdmin)
