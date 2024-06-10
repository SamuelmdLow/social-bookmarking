from rest_framework import serializers
from .models import Post, FeaturedPosts, Tag

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'title', 'desc', 'link', 'date', 'tags', 'page_title', 'page_desc', 'image', 'icon')

class FeaturedPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeaturedPosts
        fields = ('id', 'post')

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('id', 'name', 'slug', 'colour', 'contrast_colour', 'use_count')