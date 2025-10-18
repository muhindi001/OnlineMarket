from django.urls import path
from OnlineMarketApp import views as online_views
from Accounts import views as UserViews
from rest_framework_simplejwt.views import TokenRefreshView
from Accounts.serializers import CustomTokenObtainPairSerializer
# from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.views import TokenObtainPairView as BaseTokenObtainPairView
# from rest_framework_simplejwt.views import TokenRefreshView
from Accounts.views import LogoutView


class CustomTokenObtainPairView(BaseTokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

# Define your API endpoints here
urlpatterns = [
    path('register/', UserViews.RegisterView.as_view()),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('shoes/', online_views.ShoesListView.as_view(), name='shoes-list'),
    path('kids_wear/', online_views.KidsWearListView.as_view(), name='kids-wear-list'),
    path('mens_wear/', online_views.MensWearListView.as_view(), name='mens-wear-list'),
    path('electronics/', online_views.ElectronicsListView.as_view(), name='electronics-list'),
    path('products/', online_views.ProductsListView.as_view(), name='products-list'),
    path('fashion/', online_views.FashionListView.as_view(), name='fashion-list'),
    path('hero/', online_views.HeroListView.as_view(), name='hero-list'),
    path('top_products/', online_views.TopProductsListView.as_view(), name='top-products-list'),
    path('product/', online_views.ProductListView.as_view(), name='product-list'),
]