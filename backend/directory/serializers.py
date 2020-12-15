from rest_framework import serializers
from .models import Entity, SocialNetwork, SocialPost


class SocialPostSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = SocialPost
        fields = ['network', 'url', 'date', 'imageUrl', 'text']


class SocialNetworkSerializer(serializers.HyperlinkedModelSerializer):
    posts = SocialPostSerializer(many=True, read_only=True)

    class Meta:
        model = SocialNetwork
        fields = ['entity', 'isDefault', 'networkType', 'url', 'iconUrl', 'posts']


class EntitySerializer(serializers.HyperlinkedModelSerializer):
    networks = SocialNetworkSerializer(many=True, read_only=True)

    class Meta:
        model = Entity
        fields = ['name', 'image_url', 'description', 'email', 'networks']

