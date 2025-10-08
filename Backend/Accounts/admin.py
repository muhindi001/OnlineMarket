from django.contrib import admin
from .models import User

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
	list_display = ('first_name', 'last_name', 'email', 'username','password')
	fields = ('first_name', 'last_name', 'email', 'username', 'password', 'profile_image')
