
from django.shortcuts import render, redirect, get_object_or_404
from .models import URLMapping
from django.http import JsonResponse
from django.views.decorators.http import require_POST, require_GET
import json

@require_GET
def index(request):
    return render(request, 'shortener/index.html')

@require_POST
def shorten_url(request):
    try:
        data = json.loads(request.body)
        long_url = data.get('long_url')
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)

    if not long_url:
        return JsonResponse({'error': 'Long URL is required'}, status=400)

    
    url_mapping = URLMapping.objects.filter(long_url=long_url).first()
    if url_mapping:
        short_url = request.build_absolute_uri('/') + url_mapping.short_code
        return JsonResponse({'short_url': short_url})

    new_url = URLMapping(long_url=long_url)
    new_url.save()
    short_url = request.build_absolute_uri('/') + new_url.short_code
    return JsonResponse({'short_url': short_url})

def redirect_to_long_url(request, short_code):
    url_mapping = get_object_or_404(URLMapping, short_code=short_code)
    url_mapping.click_count += 1
    url_mapping.save()
    return redirect(url_mapping.long_url)