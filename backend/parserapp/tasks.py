from celery import shared_task
from .utils.urlNewsPars import listLinkParser
from .utils.urlTextPars import urlTextPars

@shared_task
def parse_links():
    return listLinkParser()

@shared_task
def parse_content():
    return urlTextPars()
