from django.contrib import admin
from .models import FamilyTree, Cousin, Aunt, GrandParent, Uncle

# Register your models here.

admin.site.register(FamilyTree)
admin.site.register(Cousin)
admin.site.register(Aunt)
admin.site.register(GrandParent)
admin.site.register(Uncle)
