# Generated by Django 5.0.6 on 2024-06-10 04:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0005_tag_post_tags'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='page_desc',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='post',
            name='tags',
            field=models.ManyToManyField(blank=True, to='posts.tag'),
        ),
    ]