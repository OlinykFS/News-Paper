from __future__ import absolute_import, unicode_literals
import os
from celery import Celery

# Устанавливаем переменную окружения для Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'App.settings')

# Создаем экземпляр приложения Celery
app = Celery('App')

# Загрузка конфигурации из Django
app.config_from_object('django.conf:settings', namespace='CELERY')

# Автоматическое обнаружение задач
app.autodiscover_tasks()
