from django.contrib import admin
from .models import Post, FeaturedPosts, Tag

class PostAdmin(admin.ModelAdmin):
    list_display = ("title", "link", "date")

class FeaturedPostsAdmin(admin.ModelAdmin):
    list_display = ("post",)

class TagAdmin(admin.ModelAdmin):
    list_display = ("name", "use_count")
    prepopulated_fields = {"slug": ("name",)}

admin.site.register(Post, PostAdmin)
admin.site.register(FeaturedPosts, FeaturedPostsAdmin)
admin.site.register(Tag, TagAdmin)