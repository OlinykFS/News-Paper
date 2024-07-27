from django.http import JsonResponse
from .utils.ai_processor import process_unprocessed_posts, get_processing_statistics
from rest_framework.decorators import api_view
@api_view(["GET"])
def process_posts(request):
    processed_count = process_unprocessed_posts()
    return JsonResponse({'processed_posts': processed_count})

@api_view(["GET"])
def get_stats(request):
    stats = get_processing_statistics()
    return JsonResponse(stats)