import requests
import bs4
from parserapp.models import PostLink
import logging

import lxml

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

link = 'https://dig.watch/'
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'}

def listLinkParser():
    try:
        response = requests.get(link, headers=headers)
        response.raise_for_status()
    except requests.RequestException as e:
        logger.error(f"Error fetching the URL: {e}")
        return []

    try:
        soup = bs4.BeautifulSoup(response.text, 'lxml')
        links_a = soup.find_all('a', class_='dw-article_image')
    except Exception as e:
        logger.error(f"Error parsing the HTML: {e}")
        return []

    parsed_links = []
    for url in links_a:
        href = url.get('href')
        if href:
            if not PostLink.objects.filter(url=href).exists():
                post_link = PostLink.objects.create(url=href)
                parsed_links.append(href)
                logger.info(f"New link added: {href}")
            else:
                logger.info(f"Link already exists: {href}")

    return parsed_links


