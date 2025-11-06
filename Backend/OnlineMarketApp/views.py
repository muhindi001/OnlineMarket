from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework import status
from django.core.mail import send_mail
from rest_framework.generics import ListAPIView
from rest_framework.permissions import DjangoModelPermissionsOrAnonReadOnly
from .models import Shoes, Kids_Wear, Mens_Wear, Electronics, Products, Fashion, Hero, TopProducts, Product,Subscription, Notification
from .serializers import ShoesSerializer, KidsWearSerializer, MensWearSerializer, ElectronicsSerializer, ProductsSerializer, FashionSerializer, HeroSerializer, TopProductsSerializer, ProductSerializer,SubscriptionSerializer

# create your views here
class SubscribeView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        email = request.data.get('email')
        if not email:
            return Response({'detail': 'Email required'}, status=status.HTTP_400_BAD_REQUEST)
        subscription, created = Subscription.objects.get_or_create(email=email)
        if not created:
            return Response({'detail': 'Already subscribed'}, status=status.HTTP_200_OK)

        # create admin/global notification (or assign to user if authenticated)
        Notification.objects.create(
            message=f"New subscription: {email}",
            data={'email': email}
        )

        # optional: send confirmation email (move to Celery for production)
        send_mail(
            'Thanks for subscribing',
            'You will be notified about new products.',
            'from@example.com',
            [email],
            fail_silently=True,
        )
        return Response(SubscriptionSerializer(subscription).data, status=status.HTTP_201_CREATED)

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



class ProductListView(ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]

    def get_queryset(self):
        search = self.request.GET.get('search', '').strip()
        page_type = self.request.GET.get('type', '').strip().lower()
        queryset = Product.objects.all()
        if page_type:
            queryset = queryset.filter(title__iexact=page_type)
        if search:
            queryset = queryset.filter(title__icontains=search)
        return queryset

