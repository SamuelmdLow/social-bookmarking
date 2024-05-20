from django.shortcuts import render
from rest_framework import viewsets
from .serializers import PostSerializer, FeaturedPostSerializer
from .models import Post, FeaturedPosts
from rest_framework import filters

class PostView(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all()
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title']
    ordering_fields = ['date']

class FeaturedPostView(viewsets.ModelViewSet):
    serializer_class = FeaturedPostSerializer
    queryset = FeaturedPosts.objects.all()