import requests
import bs4
from backend.parserapp.models import PostLink


link = 'https://dig.watch/'


def listLinkParser():
    response = requests.get(link)
    soup = bs4.BeautifulSoup(response.text, 'html.parser')
    links_a = soup.find_all('a', class_='dw-article_image')

    for url in links_a:
        href = url.get('href')
        PostLink.objects.get_or_create(url=href)

    return PostLink.objects.values_list('url', flat=True)