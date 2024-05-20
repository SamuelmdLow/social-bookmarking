from rest_framework import serializers
from .models import Post, FeaturedPosts

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'title', 'desc', 'link', 'date')

class FeaturedPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeaturedPosts
        fields = ('id', 'post')