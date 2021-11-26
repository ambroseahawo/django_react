from django.db import models

# Create your models here.
# each model is python class
class Article(models.Model):
    # database fields
    title = models.CharField(max_length=100)
    description = models.TextField()

    # view item title on admin list view
    def __str__(self):
        return self.title
    
    class Meta:
        ordering = ['-id']
