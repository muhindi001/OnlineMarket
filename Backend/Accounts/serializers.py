from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model
from .models import User

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    identifier = serializers.CharField(write_only=True)
    # Remove username field from serializer fields
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields.pop('username', None)

    def validate(self, attrs):
        identifier = attrs.get('identifier')
        password = attrs.get('password')
        user = None
        User = get_user_model()
        # Try username
        try:
            user = User.objects.get(username=identifier)
        except User.DoesNotExist:
            # Try email
            try:
                user = User.objects.get(email=identifier)
            except User.DoesNotExist:
                pass
        if user and user.check_password(password):
            attrs['username'] = user.username
            return super().validate(attrs)
        raise serializers.ValidationError({'detail': 'You wrong username/email or password, please try again.'})
 

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(required=True, write_only=True, min_length=8, style={'input_type':'password'})
    confirm_password = serializers.CharField(required=True, write_only=True, min_length=8, style={'input_type':'password'})
    first_name = serializers.CharField(required=False)
    last_name = serializers.CharField(required=False)
    email = serializers.EmailField(required=False)

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username', 'email', 'password', 'confirm_password', 'profile_image']

    def validate(self, data):
        password = data.get('password')
        confirm_password = data.get('confirm_password')
        if password and confirm_password and password != confirm_password:
            raise serializers.ValidationError({"confirm_password": "Passwords do not match."})
        return data

    def create(self, validated_data):
        validated_data.pop('confirm_password', None)
        user = User.objects.create_user(
            first_name=validated_data.get('first_name'),
            last_name=validated_data.get('last_name'),
            username=validated_data.get('username'),
            email=validated_data.get('email'),
            password=validated_data.get('password'),
            profile_image=validated_data.get('profile_image', None)
        )
        return user
