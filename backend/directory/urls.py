from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'entities', views.EntityViewSet)
router.register(r'categories', views.CategoryViewSet)
router.register(r'networks', views.SocialNetworkViewSet)
router.register(r'posts', views.SocialPostViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
