from parserapp.models import Post
from django.utils import timezone
from .post_generate import process_text


def process_unprocessed_posts():
    unprocessed_posts = Post.objects.filter(processed=False)
    processed_count = 0

    for post in unprocessed_posts:
        processed_content = process_text(post.content)

        post.content = processed_content
        post.processed = True
        post.processed_at = timezone.now()
        post.save()
        processed_count += 1

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