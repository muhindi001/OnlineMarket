from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework import status
from .models import Shoes, Kids_Wear, Mens_Wear, Electronics, Products, Fashion, Hero, TopProducts
from .serializers import ShoesSerializer, KidsWearSerializer, MensWearSerializer, ElectronicsSerializer, ProductsSerializer, FashionSerializer, HeroSerializer, TopProductsSerializer
from rest_framework import generics, filters
from django_filters.rest_framework import DjangoFilterBackend
from OnlineMarketApp.models import Product
from .serializers import ProductSerializer

# create your views here
class ShoesListView(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request):
        shoes = Shoes.objects.all()
        serializer = ShoesSerializer(
            shoes, many=True, context={'request': request}
        )
        return Response(serializer.data)

    def post(self, request):
        serializer = ShoesSerializer(
            data=request.data, context={'request': request} 
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    
# Kids Wear API
class KidsWearListView(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request):
        kids_wear = Kids_Wear.objects.all()
        serializer = KidsWearSerializer(
            kids_wear, many=True, context={'request': request}
        )
        return Response(serializer.data)

    def post(self, request):
        serializer = KidsWearSerializer(
            data=request.data, context={'request': request}
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400) 

class MensWearListView(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request):
        mens_wear = Mens_Wear.objects.all()
        serializer = MensWearSerializer(mens_wear, many=True, context={'request': request})
        return Response(serializer.data)

    def post(self, request):
        serializer = MensWearSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)  

# Electronics API
class ElectronicsListView(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request):
        electronics = Electronics.objects.all()
        serializer = ElectronicsSerializer(electronics, many=True, context={'request': request})
        return Response(serializer.data)

    def post(self, request):
        serializer = ElectronicsSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

# Products API
class ProductsListView(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request):
        products = Products.objects.all()
        serializer = ProductsSerializer(products, many=True, context={'request': request})
        return Response(serializer.data)

    def post(self, request):
        serializer = ProductsSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

# Fashion API
class FashionListView(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request):
        fashion = Fashion.objects.all()
        serializer = FashionSerializer(fashion, many=True, context={'request': request})
        return Response(serializer.data)

    def post(self, request):
        serializer = FashionSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Hero API
class HeroListView(APIView):
    def get_queryset(self):
        return Hero.objects.all()

    def get(self, request):
        heroes = self.get_queryset()
        serializer = HeroSerializer(heroes, many=True, context={'request': request})
        return Response(serializer.data)

    def post(self, request):
        serializer = HeroSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Top Products API
class TopProductsListView(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request):
        products = TopProducts.objects.all()
        serializer = TopProductsSerializer(products, many=True, context={'request': request})
        return Response(serializer.data)

    def post(self, request):
        serializer = TopProductsSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    

class ProductListView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]

    # You can filter by these exact model fields
    filterset_fields = ['cost', 'rating', 'cart']
    
    # Search by these fields (text-based)
    search_fields = ['title', 'description']
    
    # Allow sorting by cost, title, and rating
    ordering_fields = ['cost', 'title', 'rating']