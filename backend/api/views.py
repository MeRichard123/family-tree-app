from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
import json

from .serializers import *

from .models import Uncle, Aunt, FamilyTree, Cousin, GrandParent, Sibling

@api_view(["get"])
def ListRoutes(req):
    routes = {
        "aunts": "/api/aunts/",
        "aunts 1": "/api/aunts/:name",
        "uncles": "/api/uncles/",
        "uncles 1": "/api/uncles/:name",
        "cousins": "/api/cousins/",
        "cousins 1": "/api/cousins/:name",
        "grandparents": "/api/grandparents/",
        "grandparents 1": "/api/grandparents/:name",
        "siblings": "/api/siblings/",
        "siblings 1": "/api/siblings/:name",
        "tree": "/api/tree/",
        "tree 1": "/api/tree/:id",
        'auth': {
            "Register":"api/auth/register",
            "Login":"api/auth/login", 
            "Get User Data":"api/auth/user",
            "Logout":"api/auth/logout"
        }
    }

    return Response(routes)

# CRUD operations for Aunt Table

class AuntViewset(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
        
    def list(self,req):
        queryset = Aunt.objects.filter(user=req.user)
        serializer = AuntSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, req, pk):
        if len(pk) > 1:
            field_name = "name"
            queryset = Aunt.objects.filter(**{field_name: pk})
        else:
            queryset = Aunt.objects.filter(pk =  pk)
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

class SiblingViewset(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def list(self,req):
        queryset = Sibling.objects.filter(user=req.user)
        serializer = A=SiblingSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, req, pk):
        field_name = "name"
        queryset = Sibling.objects.filter(**{field_name: pk})
        serializer = SiblingSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, req):
        serializer = SiblingSerializer(data=req.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, req, pk):
        field_name = "name"
        member = Sibling.objects.filter(**{field_name: pk})
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
        if len(pk) > 1:
            field_name = "name"
            queryset = Uncle.objects.filter(**{field_name: pk})
        else:
            queryset = Uncle.objects.filter(pk = pk)
            
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
        cousinQS = Cousin.objects.filter(user=req.user)
        siblingQS = Sibling.objects.filter(user=req.user)
        auntsQS = Aunt.objects.filter(user=req.user)
        uncleQS = Uncle.objects.filter(user=req.user)
        grandparentQS = GrandParent.objects.filter(user=req.user)
        queryset = FamilyTree.objects.filter(user=pk)

        cousinData = CousinSerializer(cousinQS, many=True)
        siblingData = SiblingSerializer(siblingQS, many=True)
        auntData = AuntSerializer(auntsQS, many=True)
        uncleData = UncleSerializer(uncleQS, many=True)
        grandparentData = GrandparentSerializer(grandparentQS, many=True)
        serializer = FamilyTreeSerializer(queryset, many=True)
        try:
            return Response({
                'user': serializer.data[0].get("user"),
                'mother': serializer.data[0].get("mother"),
                'father': serializer.data[0].get("father"),
                "cousins": cousinData.data,
                "siblings": siblingData.data,
                "aunts": auntData.data,
                "uncles": uncleData.data,
                "grandparents": grandparentData.data
            })
        except:
            return Response(data={"Not Found"}, status=status.HTTP_204_NO_CONTENT)

    def create(self, req):
        serializer = FamilyTreeSerializer(data=req.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, req, pk):
        instance = FamilyTree.objects.get(id=pk)
        serializer = FamilyTreeSerializer(instance, data=req.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"data":"Tree Updated"}, status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, req, pk):
        user_tree = FamilyTree.objects.filter(user=req)
        user_tree.delete()
        return Response(data={"Tree Deleted"}, status=status.HTTP_204_NO_CONTENT)

    