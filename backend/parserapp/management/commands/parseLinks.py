from django.core.management.base import BaseCommand
from parserapp.utils.urlNewsPars import listLinkParser

class Command(BaseCommand):
    help = 'Parse and save links'

    def handle(self, *args, **options):
        links = listLinkParser()
        self.stdout.write(self.style.SUCCESS(f'Successfully parsed and saved {len(links)} links'))

