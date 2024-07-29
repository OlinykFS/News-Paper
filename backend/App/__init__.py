from __future__ import absolute_import, unicode_literals

import django
django.setup()

from .myCelery import app as celery_app

__all__ = ('celery_app',)
