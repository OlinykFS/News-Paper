import requests
import bs4
from parserapp.models import PostLink, Post

def urlTextPars():
    links = PostLink.objects.all()

    post = {}

    for link in links:
        url = link.url
        response = requests.get(url)
        soup = bs4.BeautifulSoup(response.text, 'html.parser')
        postTime = soup.find_all('div', class_='dw-article-time')
        postTitle = soup.find_all('div', class_='dw-term-title')
        postText = soup.find_all('div', class_='dw-term-description')

        if postText and postTime and postTitle:
            postText = postText[0].text.strip()
            postTitle = postTitle[0].text.strip()
            postTime = postTime[0].text.strip()

            if not Post.objects.filter(title=postTitle).exists():
                Post.objects.create(
                    title=postTitle,
                    content=postText,
                    created_at=postTime
                )
                post[url] = {
                    'time': postTime,
                    'title': postTitle,
                    'text': postText
                }
            else:
                print(f'Post with title "{postTitle}" already exists.')

        else:
            print(f'Missing data for URL: {url}')

    return post