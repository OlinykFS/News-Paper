import requests
import bs4
import json
from urlNewsPars import listLinkParser

def urlTextPars():
    links = listLinkParser()
    post = {}

    for url in links:
        response = requests.get(url)
        soup = bs4.BeautifulSoup(response.text, 'html.parser')
        postTime = soup.find_all('div', class_='dw-article-time')
        postTitle = soup.find_all('div', class_='dw-term-title')
        postText = soup.find_all('div', class_='dw-term-description')

        if postText and postTime and postTitle:
            postText = postText[0].text.strip()
            postTitle = postTitle[0].text.strip()
            postTime = postTime[0].text.strip()

            post[url] = {
                'time': postTime,
                'title': postTitle,
                'text': postText
            }
        else:
            print(f'Missing data for URL: {url}')

    return post

parsed_posts = urlTextPars()

print(json.dumps(parsed_posts, indent=4, ensure_ascii=False))
