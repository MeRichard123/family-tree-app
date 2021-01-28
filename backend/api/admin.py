from django.contrib import admin
from .models import FamilyTree, Cousin, Aunt, GrandParent, Uncle, Sibling

# Register your models here.

@admin.register(FamilyTree)
class FamilyTreeProfile(admin.ModelAdmin):
    list_display = ['id','user']

@admin.register(Cousin)
class CousinAdminProfile(admin.ModelAdmin):
    list_filter = ["user"]
    list_display = ["id", "name", "user"]
    list_display_links = ['name']

@admin.register(Aunt)
class AuntAdminProfile(admin.ModelAdmin):
    list_filter = ["user"]
    list_display = ["id", "name", "user"]
    list_display_links = ['name']

@admin.register(GrandParent)
class GrandParentAdminProfile(admin.ModelAdmin):
    list_filter = ["user"]
    list_display = ["id", "name", "user"]
    list_display_links = ['name']

@admin.register(Uncle)
class UncleAdminProfile(admin.ModelAdmin):
    list_filter = ["user"]
    list_display = ["id", "name", "user"]
    list_display_links = ['name']

@admin.register(Sibling)
class SiblingAdminProfile(admin.ModelAdmin):
    list_filter = ["user"]
    list_display = ["id", "name", "user"]
    list_display_links = ['name']
