from django.shortcuts import render
# end points are kinda like what operations are available
# Create your views here.
from .models import Post
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import PostSerializer
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

#NOTE :Password is not as what we use to login to MongoDB, can configure it in 'Database Access' page
connection_string = "mongodb+srv://eimantas:admin@cluster0.ajo2cze.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
# Create a new client and connect to the server
client = MongoClient(connection_string, server_api=ServerApi('1'))
db = client['usersdb'] 
users_collection = db['users']




@api_view(['GET']) #the request methods that the api can take
def index(request): #this end point is called index and takes a request
    
    return Response({"Success": "The setup was successful"})

@api_view(['GET'])
def GetAllPosts(request):
    get_posts = Post.objects.all() #gets all post in dtabase, passes in all that it got
    seralizer = PostSerializer(get_posts,many=True) #passes into the class we made, then converted to a format that can be used by response class
    #need many=true, we want trying to pass in query set (list of objects) not just one item
    return Response(seralizer.data) #pass in our data, returned in json format

@api_view(['POST']) # ADD new information
def CreatePost(request):
    #grab data coming in from POST request
    data= request.data
    print(data)
    
    #check if data is correct, which we specified in models.py
    serializer = PostSerializer(data=data)
    data2 = {"username":data['title'],"password":data['content']}
    users_collection.insert_one(data2)
    
    
    
    if serializer.is_valid():
        serializer.save() #save to DB
        print(request.data)
        return Response({"success":"post created"},status=201) #code based on rules you can google for status code 
    else:
        return Response(serializer.errors,status=400)
    

    
    
@api_view(['DELETE'])
def DeletePost(request):
    post_id = request.data.get('post_id')
    try:
        post = Post.objects.get(id=post_id)
        post.delete()
        return Response({"success":"the post was deleted"},status=200)
    except Post.DoesNotExist:
        return Response({"Error":"post was not found for deleteion"},status=404)

    
@api_view(['GET'])
def GetPost(request):
    post_id = request.data.get('post_id')
    try:
        post = Post.objects.get(id=post_id)
        serializer = PostSerializer(post)
        return Response(serializer.data)
    except Post.DoesNotExist:
        return Response({"Error":"post does not exist"},status=404)


@api_view(['PUT']) #update existing data
def UpdatePost(request):
    post_id = request.data.get('post_id')
    get_new_title = request.data.get('new_title')
    get_new_content = request.data.get('new_content')
    
    try:
        post = Post.objects.get(id=post_id)
        
        if get_new_title:
            post.title = get_new_title
        if get_new_content:
            post.content = get_new_content
            
        post.save()
        return Response({"success":"post successfully updated"})
        
    except Post.DoesNotExist:
        return Response({"Error":"Post does not exist"},status=404)
