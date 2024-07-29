from celery import shared_task
from .models import PostLink, Post
from .utils import urlNewsPars, urlTextPars

@shared_task
def parse_links_task():
    links = urlNewsPars()
    for link in links:
        PostLink.objects.create(url=link)

@shared_task
def parse_content_task():
    links = PostLink.objects.filter(processed=False)
    for link in links:
        content = urlTextPars(link.url)
        Post.objects.create(title=content['title'], content=content['body'])
        link.processed = True
        link.save()