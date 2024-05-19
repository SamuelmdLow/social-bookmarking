from django.db import models

class Post(models.Model):
    title = models.CharField(max_length=200)
    desc = models.TextField()
    link = models.URLField()
    date = models.DateTimeField()

    def __str__(self):
        return self.title

class FeaturedPosts(models.Model):
    post = models.ForeignKey(
        Post,
        on_delete=models.CASCADE,
        blank=True,
        null=True,
    )