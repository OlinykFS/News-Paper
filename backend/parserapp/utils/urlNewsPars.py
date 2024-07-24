import requests
import bs4

link = 'https://dig.watch/'

def listLinkParser():
    response = requests.get(link)
    soup = bs4.BeautifulSoup(response.text, 'html.parser')
    links_a = soup.find_all('a', class_='dw-article_image')
    links = []
    for url in links_a:
        links.append(url.get('href'))
    return links

