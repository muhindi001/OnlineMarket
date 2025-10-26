"""
URL configuration for stock_prediction project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.auth import views as auth_views
from django.shortcuts import redirect



urlpatterns = [
    path('admin/logout/', auth_views.LogoutView.as_view(next_page='http://localhost:5173/Login'), name='admin_logout'),
    path('admin/', admin.site.urls),
    path('admin/login/', lambda r: redirect('http://localhost:5173/Login')),
    
    

    # Base API Endpoints
    path('api/v1/', include('Api.urls')),
    path('api/v1/', include('Api.urls')),
    path('api/v1/kids_wear/', include('Api.urls')),
    path('api/v1/mens_wear/', include('Api.urls')),
    path('api/v1/electronics/', include('Api.urls')),
    path('api/v1/electronics/', include('Api.urls')),
    path('api/v1/products/', include('Api.urls')),
    path('api/v1/fashion/', include('Api.urls')),
    path('api/v1/hero/', include('Api.urls')),
    path('api/v1/top_products/', include('Api.urls')),
    path('api/v1/product/', include('Api.urls')),
    path('api/v1/payment/', include('Api.urls')),
]
urlpatterns = urlpatterns + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
