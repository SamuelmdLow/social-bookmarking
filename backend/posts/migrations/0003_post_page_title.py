# Generated by Django 5.0.6 on 2024-06-08 06:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0002_post_icon_post_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='page_title',
            field=models.CharField(max_length=200, null=True),
        ),
    ]