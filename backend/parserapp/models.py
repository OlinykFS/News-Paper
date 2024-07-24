from django.db import models

from django.db import models

class ParsedPost(models.Model):
    url = models.URLField(unique=True)
    title = models.CharField(max_length=255)
    content = models.TextField()
    parsed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
