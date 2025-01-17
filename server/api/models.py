from django.db import models

# Create your models here.
class User(models.Model):
    primary_key = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    phone_number = models.IntegerField()
    
    def __str__(self):
        return self.name