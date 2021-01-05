from django.contrib.auth.models import User
from django.db import models
# Create your models here.

SIDE_CHOICES = (
    ("Paternal", "Paternal"),
    ("Maternal","Maternal")
)

GRANDPARENT_CHOICES = (
    ("Great", "Great"),
    ("Regular","Regular")
)


class Aunt(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=100, null=True, blank=True)
    side = models.CharField(max_length=10, choices=SIDE_CHOICES, default="Maternal")
    spouse = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return self.name

class Uncle(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=100, null=True, blank=True)
    side = models.CharField(max_length=10, choices=SIDE_CHOICES, default="Maternal")
    spouse = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return self.name

class Cousin(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=100, null=True, blank=True)
    spouse = models.CharField(max_length=100, null=True, blank=True)
    Father = models.ForeignKey(Uncle, null=True, blank=True, on_delete=models.CASCADE)
    Mother = models.ForeignKey(Aunt, null=True, blank=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class GrandParent(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=100, null=True, blank=True)
    side = models.CharField(max_length=10, choices=SIDE_CHOICES, default="Maternal")
    GType = models.CharField(max_length=15, choices=GRANDPARENT_CHOICES, default="Regular")

    def __str__(self):
        return self.name

class Sibling(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return self.name

class FamilyTree(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    mother = models.CharField(max_length=100)
    father = models.CharField(max_length=100)
    siblings = models.ManyToManyField(Sibling)
    cousins = models.ManyToManyField(Cousin)
    aunts = models.ManyToManyField(Aunt)
    uncles = models.ManyToManyField(Uncle)
    grandparents = models.ManyToManyField(GrandParent)

    def __str__(self):
        return f"{self.user.username}'s Family Tree"