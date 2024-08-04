from django.db import models
from colorfield.fields import ColorField
from os import environ

class Tag(models.Model):
    name = models.CharField(max_length=50)
    slug = models.SlugField(default="", null=False)
    colour = ColorField(default="#EEEEEE")
    contrast_colour = ColorField(default="#4E4E4E")
    use_count = models.IntegerField(default=0)

    def __str__(self):
        return self.name

class Post(models.Model):
    title = models.CharField(max_length=200)
    desc = models.TextField()
    link = models.URLField()
    date = models.DateTimeField()
    page_title = models.CharField(max_length=200, blank=True, null=True)
    page_desc = models.TextField(blank=True, null=True)
    image = models.URLField(blank=True, null=True,)
    icon = models.URLField(blank=True, null=True,)
    tags = models.ManyToManyField(Tag, blank=True)

    def save(self, *args, **kwargs):
        import urllib.request
        import urllib.parse
        from bs4 import BeautifulSoup
        fixUrl = lambda u: urllib.parse.urlparse(self.link).scheme + "://" + urllib.parse.urlparse(self.link).netloc + u if (u[0] == "/") else u
        link_page = urllib.request.urlopen(self.link).read()
        soup = BeautifulSoup(link_page, 'html.parser')

        page_title = soup.findAll("title")
        if(len(page_title)>0):
            self.page_title = page_title[0].decode_contents()
        else:
            page_title = soup.findAll("meta", {"property": "og:title"})
            if(len(page_title)>0):
                self.page_title = page_title[0]["content"]

        page_desc = soup.findAll("meta", {"name": "description"})
        if(len(page_desc)>0):
            self.page_desc = page_desc[0]["content"]
        else:
            page_desc = soup.findAll("meta", {"property": "og:description"})
            if(len(page_desc)>0):
                self.page_desc = page_desc[0]["content"]

        image = soup.findAll("meta", {"property": "og:image"})
        if(len(image)>0):
            self.image = image[0]["content"]
            print("image %s", image[0]["content"])

        icon = soup.findAll("link", {"rel": "apple-touch-icon"})
        if(len(icon)>0):
            maxSize = lambda i: int(i["sizes"].split("x")[0]) if i.has_key("sizes") else 0
            icon.sort(key=maxSize, reverse=True)
            self.icon = fixUrl(icon[0]["href"])

            print("apple icon %s", icon[0]["href"])
        else:
            icon = soup.findAll("link", {"rel": "icon"})
            if(len(icon)>0):
                maxSize = lambda i: int(i["sizes"].split("x")[0]) if i.has_key("sizes") else 0
                icon.sort(key=maxSize, reverse=True)
                self.icon = fixUrl(icon[0]["href"])
                print("icon %s", icon[0]["href"])

        super(Post, self).save(*args, **kwargs)

    def get_full_url(self):
        site = 'http://example.com/'
        if 'SITE_URL' in environ:
            site = environ['SITE_URL']
        return site + 'post/' + str(self.id)

    def __str__(self):
        return self.title

class FeaturedPosts(models.Model):
    post = models.ForeignKey(
        Post,
        on_delete=models.CASCADE,
        blank=True,
        null=True,
    )