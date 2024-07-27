import openai
from django.utils import timezone
from parserapp.models import Post
from .post_generate import process_text
import time

def process_unprocessed_posts():
    unprocessed_posts = Post.objects.filter(processed=False)
    processed_count = 0

    for post in unprocessed_posts:
        try:
            processed_content = process_text(post.content)
            post.content = processed_content
            post.processed = True
            post.processed_at = timezone.now()
            post.save()
            processed_count += 1
            print(f"Successfully processed post {post.id}")
        except openai.RateLimitError:
            print(f"Rate limit exceeded, waiting for 60 seconds before retrying.")
            time.sleep(60)  # Ожидаем 60 секунд перед повторной попыткой
        except Exception as e:
            print(f"Error processing post {post.id}: {e}")

    return processed_count

def get_processed_posts():
    return Post.objects.filter(processed=True)

def get_processing_statistics():
    total_posts = Post.objects.count()
    processed_posts = Post.objects.filter(processed=True).count()
    unprocessed_posts = total_posts - processed_posts

    return {
        'total_posts': total_posts,
        'processed_posts': processed_posts,
        'unprocessed_posts': unprocessed_posts,
        'processing_percentage': (processed_posts / total_posts) * 100 if total_posts > 0 else 0
    }