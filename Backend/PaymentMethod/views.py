# payments/views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import PaymentSerializer
from .models import Payment

@api_view(['POST'])
def process_payment(request):
    serializer = PaymentSerializer(data=request.data)
    if serializer.is_valid():
        payment = serializer.save(status="Processing")

        # Handle each method differently
        method = payment.payment_method

        if method == 'card':
            # Example: integrate Stripe or custom card logic
            payment.status = "Paid"

        elif method == 'paypal':
            # Redirect or call PayPal API here
            payment.status = "Pending Confirmation"

        elif method == 'mpesa':
            # Call M-Pesa API (Daraja)
            # Generate STK Push to phone_number
            payment.status = "Awaiting M-Pesa Confirmation"

        elif method == 'stripe':
            # Use Stripe API to create payment intent
            payment.status = "Paid"

        elif method == 'bank':
            # Manual bank transfer confirmation
            payment.status = "Awaiting Bank Verification"

        payment.save()
        return Response({'message': 'Payment recorded', 'status': payment.status}, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
