from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from .serializers import *

from .models import Uncle, Aunt, FamilyTree, Cousin, GrandParent

# CRUD operations for Aunt Table

class AuntViewset(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
        
    def list(self,req):
        queryset = Aunt.objects.filter(user=req.user)
        serializer = AuntSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, req, pk):
        field_name = "name"
        queryset = Aunt.objects.filter(**{field_name: pk})
        serializer = AuntSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, req):
        serializer = AuntSerializer(data=req.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, req, pk):
        field_name = "name"
        member = Aunt.objects.filter(**{field_name: pk})
        member.delete()
        return Response(data={"Member Removed"}, status=status.HTTP_204_NO_CONTENT)


# CRUD operations for Uncle Table

class UncleViewset(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def list(self,req):
        queryset = Uncle.objects.filter(user=req.user)
        serializer = UncleSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, req, pk):
        field_name = "name"
        queryset = Uncle.objects.filter(**{field_name: pk})
        serializer = UncleSerializer(queryset, many=True)
        return Response(serializer.data)
    
    def create(self, req):
        serializer = UncleSerializer(data=req.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, req, pk):
        field_name = "name"
        member = Uncle.objects.filter(**{field_name: pk})
        member.delete()
        return Response(data={"Member Removed"}, status=status.HTTP_204_NO_CONTENT)


# CRUD operations for Aunt Table

class CousinViewset(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def list(self,req):
        queryset = Cousin.objects.filter(user=req.user)
        serializer = CousinSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, req, pk):
        field_name = "name"
        queryset = Cousin.objects.filter(**{field_name: pk})
        serializer = CousinSerializer(queryset, many=True)
        return Response(serializer.data)
    
    def create(self, req):
        serializer = CousinSerializer(data=req.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, req, pk):
        field_name = "name"
        member = Cousin.objects.filter(**{field_name: pk})
        member.delete()
        return Response(data={"Member Removed"}, status=status.HTTP_204_NO_CONTENT)

# CRUD operations for Grandparents Table

class GrandparentViewset(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def list(self, req):
        queryset = GrandParent.objects.filter(user=req.user)
        serializer = GrandparentSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, req, pk):
        field_name = "name"
        queryset = GrandParent.objects.filter(**{field_name: pk})
        serializer = GrandparentSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, req):
        serializer = GrandparentSerializer(data=req.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, req, pk):
        field_name = "name"
        member = GrandParent.objects.filter(**{field_name: pk})
        member.delete()
        return Response(data={"Member Removed"}, status=status.HTTP_204_NO_CONTENT)



class FamilyTreeViewset(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def list(self, req):
        queryset = FamilyTree.objects.filter(user=req.user)
        serializer = FamilyTreeSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, req, pk):
        queryset = FamilyTree.objects.filter(pk=pk)
        serializer = FamilyTreeSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, req):
        serializer = FamilyTreeSerializer(data=req.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, req, pk):
        user_tree = FamilyTree.objects.filter(user=req)
        user_tree.delete()
        return Response(data={"Tree Deleted"}, status=status.HTTP_204_NO_CONTENT)

    