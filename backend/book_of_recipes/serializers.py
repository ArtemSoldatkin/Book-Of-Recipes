from rest_framework import serializers
from .models import Ingredient, Recipe


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model=Ingredient
        fields=('__all__')

class RecipeSerializer(serializers.ModelSerializer):
    ingredients=IngredientSerializer(many=True)

    class Meta:
        model=Recipe
        fields=('__all__')

    def create(self, validated_data):
        ingredient_list=validated_data.pop('ingredients')
        recipe=Recipe.objects.create(**validated_data)
        for ingredient in ingredient_list:
            ingredient, created = Ingredient.objects.get_or_create(name=ingredient['name'])
            recipe.ingredients.add(ingredient)
        return recipe

    def update(self, recipe, validated_data):
        ingredients=validated_data.pop('ingredients')
        recipe.name=validated_data['name']
        recipe.image = validated_data['image']
        recipe.steps=validated_data['steps']
        for ingredient in ingredient_list:
            ingredient, created = Ingredient.objects.get_or_create(name=ingredient['name'])
            recipe.ingredients.add(ingredient)
        return recipe
