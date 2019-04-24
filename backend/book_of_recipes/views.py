from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.decorators import api_view,action
from rest_framework.response import Response
from .models import Ingredient, Recipe
from .serializers import IngredientSerializer,RecipeSerializer
import re
from django.db.models import Q


class IngredientList(viewsets.ModelViewSet):
    queryset=Ingredient.objects.all().order_by('name')
    serializer_class=IngredientSerializer

class RecipeList(viewsets.ModelViewSet):
    serializer_class=RecipeSerializer

    def get_queryset(self):
        search = self.request.query_params.get('search')
        if search is None: return Recipe.objects.all().order_by('name')
        search = re.escape(search)
        ingredient_list = Ingredient.objects.filter(name__iregex = search)      
        filtered_data = Recipe.objects.filter(Q(ingredients__in=ingredient_list) | Q(name__iregex=search))
        return filtered_data
