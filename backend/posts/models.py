from django.db import models

class Post(models.Model):
    title = models.CharField(max_length=200)
    desc = models.TextField()
    link = models.URLField()
    date = models.DateTimeField()
