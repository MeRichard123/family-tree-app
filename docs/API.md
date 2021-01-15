# Family Tree App API Docs

- [<- Back](/)
- [Frontend](/Frontend.md)

### Routes

All routes (apart from login and register) are private and require Authentication headers

## **Aunts**

| Method | Route                | Description                       |
| ------ | -------------------- | --------------------------------- |
| GET    | **/api/aunts/**      | Get all the logged in users Aunts |
| POST   | **/api/aunts/**      | Add an Aunt to the user db        |
| GET    | **/api/aunts/:name** | Get a single Aunt by name         |
| DELETE | **/api/aunts/:name** | Delete a single aunt              |
| PUT    | **/api/aunts/:name** | Update a single aunt              |

## **Uncles**

| Method | Route                 | Description                        |
| ------ | --------------------- | ---------------------------------- |
| GET    | **/api/uncles/**      | Get all the logged in users Uncles |
| POST   | **/api/uncles/**      | Add an Uncle to the user db        |
| GET    | **/api/uncles/:name** | Get a single Uncle by name         |
| DELETE | **/api/uncles/:name** | Delete a single Uncle              |
| PUT    | **/api/uncles/:name** | Update a single Uncle              |

## **Cousins**

| Method | Route                  | Description                         |
| ------ | ---------------------- | ----------------------------------- |
| GET    | **/api/cousins/**      | Get all the logged in users Cousins |
| POST   | **/api/cousins/**      | Add a Cousin to the user db         |
| GET    | **/api/cousins/:name** | Get a single Cousin by name         |
| DELETE | **/api/cousins/:name** | Delete a single Cousin              |
| PUT    | **/api/cousins/:name** | Update a single Cousin              |

## **Grandparents**

| Method | Route                       | Description                              |
| ------ | --------------------------- | ---------------------------------------- |
| GET    | **/api/grandparents/**      | Get all the logged in users Grandparents |
| POST   | **/api/grandparents/**      | Add a Grandparent to the user db         |
| GET    | **/api/grandparents/:name** | Get a single Grandparent by name         |
| DELETE | **/api/grandparents/:name** | Delete a single Grandparent              |
| PUT    | **/api/grandparents/:name** | Update a single Grandparent              |

## **Siblings**

| Method | Route                   | Description                          |
| ------ | ----------------------- | ------------------------------------ |
| GET    | **/api/siblings/**      | Get all the logged in users Siblings |
| POST   | **/api/siblings/**      | Add a Sibling to the user db         |
| GET    | **/api/siblings/:name** | Get a single Sibling by name         |
| DELETE | **/api/siblings/:name** | Delete a single Sibling              |
| PUT    | **/api/siblings/:name** | Update a single Sibling              |

## **Family Tree**

| Method | Route             | Description                         |
| ------ | ----------------- | ----------------------------------- |
| GET    | **/api/tree/**    | Get the logged in users Family Tree |
| POST   | **/api/tree/**    | Add a Family Tree to the user db    |
| GET    | **/api/tree/:id** | Get a single Family Tree by user ID |
| DELETE | **/api/tree/:id** | Delete a single Family Tree         |
| PUT    | **/api/tree/:id** | Update a single Family Tree         |

# Auth Routes

| Method | Route                 | Description                                               |
| ------ | --------------------- | --------------------------------------------------------- |
| POST   | **api/auth/register** | Register User with username, email and password           |
| POST   | **api/auth/login**    | Log a user in with username and password, returns a token |
| GET    | **api/auth/user**     | Get the details of the logged in user                     |
| POST   | **api/auth/logout**   | Logout the current user                                   |

# Code Docs

Most Models have a User Foreign Key to be able to filter each instance by user.
The other fields are VarChar Fields

```python
class Uncle(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=100, null=True, blank=True)
    side = models.CharField(max_length=10, choices=SIDE_CHOICES, default="Maternal")
    spouse = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return self.name
```

For Those Interested here is the SQL:

```sql
CREATE TABLE "new__api_uncle" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
                                "name" varchar(100) NULL, "side" varchar(10) NOT NULL,
                                "spouse" varchar(100) NULL, "user_id" integer NULL REFERENCES "auth_user" ("id") DEFERRABLE INITIALLY DEFERRED);

INSERT INTO "new__api_uncle" ("id", "name", "side", "spouse", "user_id")
    SELECT "id", "name", "side", "spouse", "user_id" FROM "api_uncle";

DROP TABLE "api_uncle";
ALTER TABLE "new__api_uncle" RENAME TO "api_uncle";
CREATE INDEX "api_uncle_user_id_6d1e8ba3" ON "api_uncle" ("user_id");
COMMIT;
```

In order to be able to have multiple family members per type; I used a many to many relationship
this lets users select multiple instances per type.

```py
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
```

All Member Serializers are Model serializers

```python
class AuntSerializer(serializers.ModelSerializer):
    class Meta:
        model = Aunt
        fields = "__all__"
```

To Serializer the Family Tree Model I decided to use a SlugRelatedField.
This allows a field to be returned in the response object rather than just the id

```python
class FamilyTreeSerializer(serializers.ModelSerializer):
    cousins = serializers.SlugRelatedField(read_only=True, many=True, slug_field="name")
    aunts = serializers.SlugRelatedField(read_only=True, many=True, slug_field="name")
    uncles = serializers.SlugRelatedField(read_only=True, many=True, slug_field="name")
    grandparents = serializers.SlugRelatedField(read_only=True, many=True, slug_field="name")
    siblings = serializers.SlugRelatedField(read_only=True, many=True, slug_field="name")
    class Meta:
        model = FamilyTree
        fields = ("user","mother","father","siblings","cousins","aunts","uncles","grandparents")
```

The URL Router - I used a rest framework default router rather than putting everything in 'urlpatterns', purely because it looks neater and I used Viewsets so I had the option to.

```py
router = DefaultRouter()
router.register("aunts", AuntViewset, basename="aunts")
router.register("uncles", UncleViewset, basename="uncle")
```

All views were custom viewsets with the same methods on different models.

```py
def retrieve(self, req, pk):
        field_name = "name"
        queryset = GrandParent.objects.filter(**{field_name: pk})
        serializer = GrandparentSerializer(queryset, many=True)
        return Response(serializer.data)
```

This function used '\*\*{field_name:pk}' in order to be able use use the member name in the url rather than the id.

```py
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

```

# Authentication

## For Authentication I used Django Knox.

This object inherited from 'GenericApiView', we serialize the data and generate a token from KnoxAuth Tokens. We grab the second element in AuthToken which will be the token otherwise django can't serialize the data.

```py
    ...
    def post(self, req, *args, **kwargs):
        serializer = self.get_serializer(data=req.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })

```
