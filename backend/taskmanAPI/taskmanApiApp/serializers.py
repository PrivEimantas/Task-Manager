from rest_framework.serializers import ModelSerializer
from .models import Post

class PostSerializer(ModelSerializer): # to return all objects from get all objects, we have here a middle man
    class Meta:
        model= Post #model we wnat to serialise
        fields = '__all__' #fields we want to include, here its all
        