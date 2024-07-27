from django.core.management.base import BaseCommand
from ai.generate_posts import process_and_store_posts

class Command(BaseCommand):
    help = 'Generate new posts from parsed data and save them'

    def handle(self, *args, **options):
        process_and_store_posts()
        self.stdout.write(self.style.SUCCESS('Successfully generated and saved posts'))