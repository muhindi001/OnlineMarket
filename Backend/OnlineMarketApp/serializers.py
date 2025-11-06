from rest_framework import serializers
from .models import Shoes, Kids_Wear, Mens_Wear, Electronics, Products, Fashion, Hero, TopProducts, Product, Subscription, Notification

class SubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = ['id', 'email', 'created_at']

# Shoes Serializer
class ShoesSerializer(serializers.ModelSerializer):
    img = serializers.SerializerMethodField()

    class Meta:
        model = Shoes
        fields = ['id', 'img', 'title', 'rating', 'cost', 'cart', 'aosDelay']
        read_only_fields = ['id']  # id is auto-generated

    # Build full absolute URL for img
    def get_img(self, obj):
        request = self.context.get('request')
        if obj.img and hasattr(obj.img, 'url'):
            if request is not None:
                return request.build_absolute_uri(obj.img.url)
            return obj.img.url  # fallback if no request in context
        return None

    # Custom validation
    def validate_rating(self, value):
        if not (0 <= value <= 5):
            raise serializers.ValidationError("Rating must be between 0 and 5.")
        return value

    def validate_cost(self, value):
        if value < 0:
            raise serializers.ValidationError("Cost cannot be negative.")
        return value

    def validate_aosDelay(self, value):
        if value < 0:
            raise serializers.ValidationError("aosDelay cannot be negative.")
        return value

    # Optional custom create method
    def create(self, validated_data):
        return Shoes.objects.create(**validated_data)
    
    # Kids Wear Serializer
class KidsWearSerializer(serializers.ModelSerializer):
    img = serializers.SerializerMethodField()

    class Meta:
        model = Kids_Wear
        fields = ['id', 'img', 'title', 'rating', 'cost', 'cart', 'aosDelay']
        read_only_fields = ['id']

    def get_img(self, obj):
        request = self.context.get('request')
        if obj.img and hasattr(obj.img, 'url'):
            if request is not None:
                return request.build_absolute_uri(obj.img.url)
            return obj.img.url
        return None

    def validate_rating(self, value):
        if not (0 <= value <= 5):
            raise serializers.ValidationError("Rating must be between 0 and 5.")
        return value

    def validate_cost(self, value):
        if value < 0:
            raise serializers.ValidationError("Cost cannot be negative.")
        return value

    def validate_aosDelay(self, value):
        if value < 0:
            raise serializers.ValidationError("aosDelay cannot be negative.")
        return value

    def create(self, validated_data):
        return Kids_Wear.objects.create(**validated_data)
    
    # Mens wear Serializer
    
class MensWearSerializer(serializers.ModelSerializer):
    img = serializers.SerializerMethodField()

    class Meta:
        model = Mens_Wear
        fields = ['id', 'img', 'title', 'rating', 'cost', 'cart', 'aosDelay']
        read_only_fields = ['id']

    def get_img(self, obj):
        request = self.context.get('request')
        if obj.img and hasattr(obj.img, 'url'):
            if request is not None:
                return request.build_absolute_uri(obj.img.url)
            return obj.img.url
        return None

    def validate_rating(self, value):
        if not (0 <= value <= 5):
            raise serializers.ValidationError("Rating must be between 0 and 5.")
        return value

    def validate_cost(self, value):
        if value < 0:
            raise serializers.ValidationError("Cost cannot be negative.")
        return value

    def validate_aosDelay(self, value):
        if value < 0:
            raise serializers.ValidationError("aosDelay cannot be negative.")
        return value

    def create(self, validated_data):
        return Mens_Wear.objects.create(**validated_data) 

# Electronics Serializer
class ElectronicsSerializer(serializers.ModelSerializer):
    img = serializers.SerializerMethodField()

    class Meta:
        model = Electronics
        fields = ['id', 'img', 'title', 'rating', 'cost', 'cart', 'aosDelay']
        read_only_fields = ['id']

    def get_img(self, obj):
        request = self.context.get('request')
        if obj.img and hasattr(obj.img, 'url'):
            return request.build_absolute_uri(obj.img.url) if request else obj.img.url
        return None

    def validate_rating(self, value):
        if not (0 <= value <= 5):
            raise serializers.ValidationError("Rating must be between 0 and 5.")
        return value 
    
    # Products Serializer
class ProductsSerializer(serializers.ModelSerializer):
    img = serializers.SerializerMethodField()

    class Meta:
        model = Products
        fields = ['id', 'img', 'title', 'rating', 'aosDelay'] 
        read_only_fields = ['id']

    def get_img(self, obj):
        request = self.context.get('request')
        if obj.img and hasattr(obj.img, 'url'):
            return request.build_absolute_uri(obj.img.url) if request else obj.img.url
        return None

    def validate_rating(self, value):
        if not (0 <= value <= 5):
            raise serializers.ValidationError("Rating must be between 0 and 5.")
        return value 

class FashionSerializer(serializers.ModelSerializer):
    img = serializers.SerializerMethodField()

    class Meta:
        model = Fashion
        fields = ['id', 'img', 'title', 'rating', 'aosDelay']  # matches Fashion model
        read_only_fields = ['id']

    def get_img(self, obj):
        request = self.context.get('request')
        if obj.img and hasattr(obj.img, 'url'):
            return request.build_absolute_uri(obj.img.url) if request else obj.img.url
        return None

    def validate_rating(self, value):
        if not (0 <= value <= 5):
            raise serializers.ValidationError("Rating must be between 0 and 5.")
        return value 

class HeroSerializer(serializers.ModelSerializer):
    img = serializers.SerializerMethodField()

    class Meta:
        model = Hero
        fields = ['id', 'img', 'title', 'description']  # matches Hero model
        read_only_fields = ['id']

    def get_img(self, obj):
        request = self.context.get('request')
        if obj.img and hasattr(obj.img, 'url'):
            return request.build_absolute_uri(obj.img.url) if request else obj.img.url
        return None
    
class TopProductsSerializer(serializers.ModelSerializer):
    img = serializers.SerializerMethodField()

    class Meta:
        model = TopProducts
        fields = ['id', 'img', 'title', 'description', 'cart']  # updated fields
        read_only_fields = ['id']

    def get_img(self, obj):
        request = self.context.get('request')
        if obj.img and hasattr(obj.img, 'url'):
            return request.build_absolute_uri(obj.img.url) if request else obj.img.url
        return None

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
    img = serializers.SerializerMethodField()