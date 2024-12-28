from django.db import models

# Create your models here.
#what kind of data can be saved in db and how

class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    
    def __str__(self):
        return self.title
    