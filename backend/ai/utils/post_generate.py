import openai
from openai import OpenAI
from decouple import config
from django.utils import timezone
from parserapp.models import Post

client = OpenAI(
    api_key=config("OPENAI_API_KEY"),
)
def process_text(content):
    try:
        response = client.chat.completions.create(
            messages=[
                {
                    "role": "system", "content": "You are a helpful assistant that summarizes and enhances blog posts."
                },
                {
                    "role": "user", "content": f"Summarize and enhance the following blog post:\n\n{content}"
                }
            ],

            model="davinci-002",

            max_tokens=500
        )
        return response.choices[0].message.content.strip()
    except openai.RateLimitError as e:
        print(f"Error: Rate limit exceeded. Details: {e}")
        raise
    except openai.APIError as e:
        print(f"OpenAI API error: {e}")
        raise
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        raise

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
            print(f"Rate limit exceeded for post {post.id}, skipping.")
            continue
        except Exception as e:
            print(f"Error processing post {post.id}: {e}")
            continue

    return processed_count
