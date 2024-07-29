from django.contrib import admin
from .models import PostLink, Post
from django_celery_beat.models import PeriodicTask, IntervalSchedule
from django.db.models.signals import post_save
from django.dispatch import receiver
import json

def create_periodic_tasks():
    schedule, created = IntervalSchedule.objects.get_or_create(
        every=1,
        period=IntervalSchedule.HOURS,
    )

    if not PeriodicTask.objects.filter(name='Parse links every hour').exists():
        PeriodicTask.objects.create(
            interval=schedule,
            name='Parse links every hour',
            task='parserapp.tasks.parse_links_task',
        )

    if not PeriodicTask.objects.filter(name='Parse content every hour').exists():
        PeriodicTask.objects.create(
            interval=schedule,
            name='Parse content every hour',
            task='parserapp.tasks.parse_content_task',
        )

@receiver(post_save, sender=Post)
def post_save_create_periodic_tasks(sender, instance, **kwargs):
    create_periodic_tasks()

class PostAdmin(admin.ModelAdmin):

    pass

admin.site.register(PostLink)
admin.site.register(Post, PostAdmin)
