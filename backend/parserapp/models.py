from django.db import models

class NewsLink(models.Model):
    url = models.URLField(unique=True)
    status = models.CharField(max_length=20, default='pending')
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.url

