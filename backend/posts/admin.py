from django.contrib import admin
from .models import Post

class PostAdmin(admin.ModelAdmin):
    list_display = ("title", "link", "date")

admin.site.register(Post, PostAdmin)