from rest_framework import serializers
from .models import Ingredient, Recipe, Test, SubTest

##___________________
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


class SubTestSerializer(serializers.ModelSerializer):

    class Meta:
        model=SubTest
        fields=('id','name','count')

#Writable nested serializers
class TestSerializer(serializers.ModelSerializer):
    ingridients = SubTestSerializer(many=True)

    def create(self, validated_data):
        subtest_data = validated_data.pop('ingridients')
        test = Test.objects.create(**validated_data)


        for subtest in subtest_data:
            subtest, created = SubTest.objects.get_or_create(name=subtest['name'], count=subtest['count'])
            test.ingridients.add(subtest)
        return test

    def update(self, validated_data):
        pass

    class Meta:
        model=Test
        fields=('__all__')



        '''
{
    "ingredients": ["asd", "fdsf"],
    "name": "123",
    "steps": ["asd", "ASda"]
}
'''
