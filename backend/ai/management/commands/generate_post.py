from django.core.management.base import BaseCommand
from ai.utils.post_generate import process_unprocessed_posts
import time


class Command(BaseCommand):
    help = 'Process unprocessed posts using OpenAI API'

    def handle(self, *args, **options):
        while True:
            try:
                processed_count = process_unprocessed_posts()
                self.stdout.write(self.style.SUCCESS(f'Successfully processed {processed_count} posts'))

                if processed_count == 0:
                    self.stdout.write('No more unprocessed posts. Waiting for 5 minutes before checking again.')
                    time.sleep(300)  # Wait for 5 minutes
                else:
                    time.sleep(60)  # Wait for 1 minute before processing next batch
            except Exception as e:
                self.stdout.write(self.style.ERROR(f'An error occurred: {e}'))
                self.stdout.write('Waiting for 5 minutes before retrying.')
                time.sleep(300)