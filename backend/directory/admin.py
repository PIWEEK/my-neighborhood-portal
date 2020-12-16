from django.contrib import admin

from .models import Entity, Category, SocialNetwork, SocialPost

class EntityAdmin(admin.ModelAdmin):
    list_display = ('name', 'email')

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)

class SocialNetworkAdmin(admin.ModelAdmin):
    list_display = ('entity', 'url', 'network_type', 'is_default')

class SocialPostAdmin(admin.ModelAdmin):
    list_display = ('network', 'date')

admin.site.register(Entity, EntityAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(SocialNetwork, SocialNetworkAdmin)
admin.site.register(SocialPost, SocialPostAdmin)

