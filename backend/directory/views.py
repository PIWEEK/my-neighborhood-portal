from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import permissions
from .models import Entity, Category, SocialNetwork, SocialPost
from .serializers import EntitySerializer, CategorySerializer, \
        SocialNetworkSerializer, SocialPostSerializer


class EntityViewSet(viewsets.ModelViewSet):
    queryset = Entity.objects.all()
    serializer_class = EntitySerializer
    permission_classes = [permissions.AllowAny]


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]


class SocialNetworkViewSet(viewsets.ModelViewSet):
    queryset = SocialNetwork.objects.all()
    serializer_class = SocialNetworkSerializer
    permission_classes = [permissions.AllowAny]


class SocialPostViewSet(viewsets.ModelViewSet):
    queryset = SocialPost.objects.all()
    serializer_class = SocialPostSerializer
    permission_classes = [permissions.AllowAny]

