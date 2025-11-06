from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Subscription(models.Model):
    email = models.EmailField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email

class Notification(models.Model):
    user = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE)  # null for global/admin notices
    message = models.TextField()
    data = models.JSONField(null=True, blank=True)
    read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.message[:40]}"

class Shoes(models.Model):
    id = models.AutoField(primary_key=True)
    img = models.ImageField(upload_to='shoes/', blank=True, null=True)
    title = models.CharField(max_length=200)
    rating = models.DecimalField(max_digits=3, decimal_places=1, default=0.0)
    cost = models.DecimalField(max_digits=10, decimal_places=2)
    cart = models.BooleanField(default=False)
    aosDelay = models.IntegerField(default=0)

    def __str__(self):
        return self.title
    
class Kids_Wear(models.Model):
    id = models.AutoField(primary_key=True)
    img = models.ImageField(upload_to='kids_wear/', blank=True, null=True)
    title = models.CharField(max_length=200)
    rating = models.DecimalField(max_digits=3, decimal_places=1, default=0.0)
    cost = models.DecimalField(max_digits=10, decimal_places=2)
    cart = models.BooleanField(default=False)
    aosDelay = models.IntegerField(default=0)

    def __str__(self):
        return self.title
    
class Mens_Wear(models.Model):
    id = models.AutoField(primary_key=True)
    img = models.ImageField(upload_to='mens_wear/', blank=True, null=True)
    title = models.CharField(max_length=200)
    rating = models.DecimalField(max_digits=3, decimal_places=1, default=0.0)
    cost = models.DecimalField(max_digits=10, decimal_places=2)
    cart = models.BooleanField(default=False)
    aosDelay = models.IntegerField(default=0)

    def __str__(self):
        return self.title  

class Electronics(models.Model):
    id = models.AutoField(primary_key=True)
    img = models.ImageField(upload_to='electronics/', blank=True, null=True)
    title = models.CharField(max_length=200)
    rating = models.DecimalField(max_digits=3, decimal_places=1, default=0.0)
    cost = models.DecimalField(max_digits=10, decimal_places=2)
    cart = models.BooleanField(default=False)
    aosDelay = models.IntegerField(default=0)

    def __str__(self):
        return self.title  

class Products(models.Model):
    id = models.AutoField(primary_key=True)
    img = models.ImageField(upload_to='products/', blank=True, null=True)
    title = models.CharField(max_length=200)
    rating = models.DecimalField(max_digits=3, decimal_places=1, default=0.0)
    aosDelay = models.IntegerField(default=0)

    def __str__(self):
        return self.title
    
class Fashion(models.Model):
    id = models.AutoField(primary_key=True)
    img = models.ImageField(upload_to='fashion/', blank=True, null=True)
    title = models.CharField(max_length=200)
    rating = models.DecimalField(max_digits=3, decimal_places=1, default=0.0)
    aosDelay = models.IntegerField(default=0)

    def __str__(self):
        return self.title
    
class Hero(models.Model):
    id = models.AutoField(primary_key=True)
    img = models.ImageField(upload_to='hero/', blank=True, null=True)
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)  # new description field

    def __str__(self):
        return self.title
    
class TopProducts(models.Model):
    id = models.AutoField(primary_key=True)
    img = models.ImageField(upload_to='top_products/', blank=True, null=True)
    title = models.CharField(max_length=200)
    cart = models.BooleanField(default=False)
    description = models.TextField(blank=True, null=True)  # description field

    def __str__(self):
        return self.title
    

class Product(models.Model):
    id = models.AutoField(primary_key=True)
    img = models.ImageField(upload_to='products/', blank=True, null=True)
    title = models.CharField(max_length=200)
    rating = models.DecimalField(max_digits=3, decimal_places=1, default=0.0)
    cost = models.DecimalField(max_digits=10, decimal_places=2)
    cart = models.BooleanField(default=False)
    aosDelay = models.IntegerField(default=0)

    def __str__(self):
        return self.title

