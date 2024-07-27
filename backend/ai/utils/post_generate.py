import openai
from decouple import config

openai.api_key = config('OPENAI_API_KEY')

def process_text(content):
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant that summarizes and enhances blog posts."},
                {"role": "user", "content": f"Summarize and enhance the following blog post:\n\n{content}"}
            ],
            max_tokens=500
        )
        return response.choices[0].message['content'].strip()
    except Exception as e:
        print(f"Error processing text with OpenAI: {e}")
        return content