from django.db import models

class FeedbackInfo(models.Model):
    department = models.CharField(max_length=16)
    email = models.EmailField(null=True)
    category = models.CharField(max_length=16)
    message = models.TextField()
    
