from django.db import models
from django.contrib.postgres.fields import ArrayField, HStoreField

class Ingredient(models.Model):
    name=models.CharField(max_length=150)

    def __str__(self):
        return self.name

class Recipe(models.Model):
    name=models.CharField(max_length=200)
    #ingr=models.CharField(max_length=120, blank=True)
    steps=ArrayField(models.CharField(max_length=1500), default=list)
    ingredients=models.ManyToManyField(Ingredient, related_name="ingredients")


    def __str__(self):
        return self.name


class SubTest(models.Model):
    name=models.CharField(max_length=120)
    count=models.IntegerField()

class Test(models.Model):
    name=models.CharField(max_length=200)
    steps=ArrayField(models.CharField(max_length=2000), default=list)
    ingridients=models.ManyToManyField(SubTest, related_name="subtests")

    def __str__(self):
        return self.name
