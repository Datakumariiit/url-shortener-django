from django.contrib import admin
from .models import URLMapping

@admin.register(URLMapping)
class URLMappingAdmin(admin.ModelAdmin):
    list_display = ('short_code', 'long_url', 'created_at', 'click_count') # [cite: 21]
    search_fields = ('long_url', 'short_code')