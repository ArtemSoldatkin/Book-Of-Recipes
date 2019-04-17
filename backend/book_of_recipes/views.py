from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.decorators import api_view,action
from rest_framework.response import Response
from .models import Ingredient, Recipe, Test, SubTest
from .serializers import IngredientSerializer,RecipeSerializer, TestSerializer, SubTestSerializer
from django.db.models import Prefetch

class IngredientList(viewsets.ModelViewSet):
    queryset=Ingredient.objects.all().order_by('name')
    serializer_class=IngredientSerializer

class RecipeList(viewsets.ModelViewSet):
    queryset=Recipe.objects.all().order_by('name')
    serializer_class=RecipeSerializer


class TestList(viewsets.ModelViewSet):
    queryset=Test.objects.all().order_by('name')
    serializer_class=TestSerializer

class SubTestList(viewsets.ModelViewSet):
    queryset=SubTest.objects.all()
    serializer_class=SubTestSerializer
