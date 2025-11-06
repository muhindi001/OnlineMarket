# PaymentMethod/views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from .serializers import PaymentSerializer
from .models import Payment

@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def process_payment(request):
    # ✅ Handle GET requests (for testing / info)
    if request.method == 'GET':
        return Response({"message": "Use POST to process payments"})

    # ✅ Handle POST requests (actual payment logic)
    serializer = PaymentSerializer(data=request.data)
    if serializer.is_valid():
        # Use the model explicitly
        payment = Payment(**serializer.validated_data)
        payment.status = "Processing"
        payment.save()

        # Handle payment methods
        method = payment.payment_method
        if method == 'card':
            payment.status = "Paid"
        elif method == 'paypal':
            payment.status = "Pending Confirmation"
        elif method == 'mpesa':
            payment.status = "Awaiting M-Pesa Confirmation"
        elif method == 'stripe':
            payment.status = "Paid"
        elif method == 'bank':
            payment.status = "Awaiting Bank Verification"

        payment.save()

        return Response({
            "message": "Payment recorded successfully",
            "payment_id": payment.id,
            "status": payment.status,
            "method": payment.payment_method
        }, status=status.HTTP_201_CREATED)

    # Return validation errors if serializer is invalid
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
