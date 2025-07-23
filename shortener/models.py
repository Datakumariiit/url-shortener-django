
from django.db import models
import random
import string

class URLMapping(models.Model):
    long_url = models.URLField(max_length=2000)
    short_code = models.CharField(max_length=10, unique=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    click_count = models.PositiveIntegerField(default=0)

    def save(self, *args, **kwargs):
        if not self.short_code:
            self.short_code = self.generate_short_code()
        super().save(*args, **kwargs)

    def generate_short_code(self):
        characters = string.ascii_letters + string.digits
        while True:
            code = ''.join(random.choice(characters) for _ in range(6))
            if not URLMapping.objects.filter(short_code=code).exists():
                return code

    def __str__(self):
        return f"{self.short_code} -> {self.long_url}"