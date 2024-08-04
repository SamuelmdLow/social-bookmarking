from django.shortcuts import render
from rest_framework import viewsets
from posts.serializers import PostSerializer, FeaturedPostSerializer, TagSerializer
from posts.models import Post, FeaturedPosts, Tag
from rest_framework import filters

class PostView(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all()
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', '=tags__slug']
    ordering_fields = ['date']

class FeaturedPostView(viewsets.ModelViewSet):
    serializer_class = FeaturedPostSerializer
    queryset = FeaturedPosts.objects.all()

class TagView(viewsets.ModelViewSet):
    serializer_class = TagSerializer
    queryset = Tag.objects.all()
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['=slug']
    ordering_fields = ['use_count']