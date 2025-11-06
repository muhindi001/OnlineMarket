from django.urls import path
from .views import ShoesListView, KidsWearListView, MensWearListView, ElectronicsListView, ProductsListView, FashionListView, HeroListView, TopProductsListView, ProductListView,SubscribeView

urlpatterns = [
    path('shoes/', ShoesListView.as_view(), name='shoes-list'),
    path('kids_wear/', KidsWearListView.as_view(), name='kids-wear-list'),
    path('mens_wear/', MensWearListView.as_view(), name='menswear-list'),
    path('electronics/', ElectronicsListView.as_view(), name='electronics-list'),
    path('products/', ProductsListView.as_view(), name='products-list'),
    path('fashion/', FashionListView.as_view(), name='fashion-list'),
    path('hero/', HeroListView.as_view(), name='hero-list'),
    path('top_products/', TopProductsListView.as_view(), name='top-products-list'),
    path('product/', ProductListView.as_view(), name='product-list'),
    path('subscribe/', SubscribeView.as_view(), name='api-subscribe'),
]
