from django.contrib import admin
from .models import Shoes, Kids_Wear, Mens_Wear, Electronics, Products, Fashion, Hero, TopProducts

@admin.register(Shoes)
class ShoesAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'rating', 'cost', 'cart', 'aosDelay')

@admin.register(Kids_Wear)
class KidsWearAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'rating', 'cost', 'cart', 'aosDelay')

@admin.register(Mens_Wear)
class MensWearAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'rating', 'cost', 'cart', 'aosDelay')

@admin.register(Electronics)
class ElectronicsAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'rating', 'cost', 'cart', 'aosDelay')

@admin.register(Products)
class ProductsAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'rating', 'aosDelay')

@admin.register(Fashion)
class FashionAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'rating', 'aosDelay')

@admin.register(Hero)
class HeroAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'description' )

@admin.register(TopProducts)
class TopProductsAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'cart', 'description')        