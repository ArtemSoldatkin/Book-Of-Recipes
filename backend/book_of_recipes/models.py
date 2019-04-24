from django.db import models
from django.contrib.postgres.fields import ArrayField, HStoreField

class Ingredient(models.Model):
    name=models.CharField(max_length=150)

    def __str__(self):
        return self.name

class Recipe(models.Model):
    name=models.CharField(max_length=200)
    image=models.TextField(blank=True)
    steps=ArrayField(models.CharField(max_length=1500), default=list)
    ingredients=models.ManyToManyField(Ingredient, related_name="ingredients")

    def __str__(self):
        return self.name
