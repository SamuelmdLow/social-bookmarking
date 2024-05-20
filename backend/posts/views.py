from django.shortcuts import render
from rest_framework import viewsets
from .serializers import PostSerializer, FeaturedPostSerializer
from .models import Post, FeaturedPosts

class PostView(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all()

class FeaturedPostView(viewsets.ModelViewSet):
    serializer_class = FeaturedPostSerializer
    queryset = FeaturedPosts.objects.all()