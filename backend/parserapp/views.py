from django.http import HttpResponse
from backend.parserapp.utils import listLinkParser

def parse_and_save_links(request):
    links = listLinkParser()
    return HttpResponse(f"Parsed and saved {len(links)} links")
