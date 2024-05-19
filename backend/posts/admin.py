from django.contrib import admin
from .models import Post, FeaturedPosts

class PostAdmin(admin.ModelAdmin):
    list_display = ("title", "link", "date")

class FeaturedPostsAdmin(admin.ModelAdmin):
    list_display = ("post",)

admin.site.register(Post, PostAdmin)
admin.site.register(FeaturedPosts, FeaturedPostsAdmin)