from celery import Celery
from celery.schedules import crontab

app = Celery('App')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()

app.conf.beat_schedule = {
    'parse-links-every-hour': {
        'task': 'parserapp.tasks.parse_links_task',
        'schedule': crontab(minute=0, hour='*/1'),
    },
    'parse-content-every-hour': {
        'task': 'parserapp.tasks.parse_content_task',
        'schedule': crontab(minute=30, hour='*/1'),
    },
}