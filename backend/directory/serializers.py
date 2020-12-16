from rest_framework import serializers
from .models import Entity, Category, SocialNetwork, SocialPost


class SocialPostSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = SocialPost
        fields = ['url', 'network', 'url', 'date', 'image_url', 'text']


class SocialNetworkSerializer(serializers.HyperlinkedModelSerializer):
    posts = SocialPostSerializer(many=True, read_only=True)

    class Meta:
        model = SocialNetwork
        fields = ['url', 'entity', 'is_default', 'network_type', 'url', 'icon_url', 'posts']


class CategorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Category
        fields = ['slug', 'name']


class EntitySerializer(serializers.HyperlinkedModelSerializer):
    categories = CategorySerializer(many=True, read_only=True)
    networks = SocialNetworkSerializer(many=True, read_only=True)

    class Meta:
        model = Entity
        fields = ['url', 'name', 'categories', 'image_url', 'description', 'email', 'networks']

