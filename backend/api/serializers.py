from rest_framework import serializers
from .models import Aunt, Uncle, Cousin, GrandParent, FamilyTree, Sibling
from django.contrib.auth.models import User


class AuntSerializer(serializers.ModelSerializer):
    class Meta:
        model = Aunt
        fields = "__all__"

class SiblingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sibling
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
    #cousins = serializers.SlugRelatedField(read_only=True, many=True, slug_field="name")
    #aunts = serializers.SlugRelatedField(read_only=True, many=True, slug_field="name")
    #uncles = serializers.SlugRelatedField(read_only=True, many=True, slug_field="name")
    #grandparents = serializers.SlugRelatedField(read_only=True, many=True, slug_field="name")
    #siblings = serializers.SlugRelatedField(read_only=True, many=True, slug_field="name")
    class Meta:
        model = FamilyTree
        fields = "__all__"
        #fields = ("user","mother","father","siblings","cousins","aunts","uncles","grandparents")

