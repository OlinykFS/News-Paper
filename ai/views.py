from django.http import HttpResponse

def index(request):
    return HttpResponse("Hello, world. You're at the ai index.")

def home(request):
    return HttpResponse("Hello, eblan aye home")