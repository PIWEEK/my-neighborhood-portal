# Generated by Django 3.1.4 on 2020-12-16 08:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('directory', '0005_auto_20201215_1233'),
    ]

    operations = [
        migrations.AddField(
            model_name='socialnetwork',
            name='account_name',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AddField(
            model_name='socialnetwork',
            name='feed_url',
            field=models.URLField(blank=True),
        ),
    ]
