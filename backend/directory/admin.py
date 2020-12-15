from django.contrib import admin

from .models import Entity, SocialNetwork, SocialPost

admin.site.register(Entity)
admin.site.register(SocialNetwork)
admin.site.register(SocialPost)

