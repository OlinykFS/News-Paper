from django.core.management.base import BaseCommand
from parserapp.utils.urlTextPars import urlTextPars
import json

class Command(BaseCommand):
    help = 'Parse URLs and print their content'

    def handle(self, *args, **options):
        parsed_posts = urlTextPars()

