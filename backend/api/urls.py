from django.contrib import admin
from django.urls import path,include
from .views import AuntViewset, UncleViewset, CousinViewset, GrandparentViewset, FamilyTreeViewset
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register("aunts", AuntViewset, basename="aunts")
router.register("uncles", UncleViewset, basename="uncle")
router.register("cousins", CousinViewset, basename="cousin")
router.register("grandparents", GrandparentViewset, basename="grandparents")
router.register("tree", FamilyTreeViewset, basename="Family Tree")


urlpatterns = [
    path("api/", include(router.urls)),
]