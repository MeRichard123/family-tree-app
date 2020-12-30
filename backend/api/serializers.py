from rest_framework import serializers
from .models import Aunt, Uncle, Cousin, GrandParent, FamilyTree
from django.contrib.auth.models import User


class AuntSerializer(serializers.ModelSerializer):
    class Meta:
        model = Aunt
        fields = "__all__"

class UncleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Uncle
        fields = "__all__"

class CousinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cousin
        fields = "__all__"

class GrandparentSerializer(serializers.ModelSerializer):
    class Meta:
        model = GrandParent
        fields = "__all__"

class FamilyTreeSerializer(serializers.ModelSerializer):
    cousins = serializers.SlugRelatedField(read_only=True, many=True, slug_field="name")
    aunts = serializers.SlugRelatedField(read_only=True, many=True, slug_field="name")
    uncles = serializers.SlugRelatedField(read_only=True, many=True, slug_field="name")
    grandparents = serializers.SlugRelatedField(read_only=True, many=True, slug_field="name")
    class Meta:
        model = FamilyTree
        fields = ("user","mother","father","cousins","aunts","uncles","grandparents")

