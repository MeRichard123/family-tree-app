from django.contrib.auth.models import User
from django.db import models

SIDE_CHOICES = (
    ("Paternal", "Paternal"),
    ("Maternal","Maternal")
)
GPARENT_TYPE = (
     ("Mother", "Mother"),
    ("Father","Father")
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
    side = models.CharField(max_length=10, choices=SIDE_CHOICES, default="Maternal")

    def __str__(self):
        return self.name

class GrandParent(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=100, null=True, blank=True)
    side = models.CharField(max_length=10, choices=SIDE_CHOICES, default="Maternal")
    Gtype = models.CharField(max_length=10, choices=GPARENT_TYPE, default="Mother")

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

    def __str__(self):
        return f"{self.user.username}'s Family Tree"


