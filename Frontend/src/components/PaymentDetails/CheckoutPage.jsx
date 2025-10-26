import { useParams } from 'react-router-dom';
import PaymentMethodSelector from '../components/PaymentDetails/PaymentMethodSelector';

const CheckoutPage = () => {
  const order = {
    id: 'ORD-12345',
    amount: 199.99,
    currency: 'USD',
    // ... other order details
  };

  const handlePaymentSuccess = (paymentData) => {
    console.log('Payment successful:', paymentData);
    // Handle successful payment
  };

  const handlePaymentError = (error) => {
    console.error('Payment error:', error);
    // Handle payment error
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <PaymentMethodSelector
        amount={order.amount * 100}
        currency={order.currency}
        onPaymentSuccess={handlePaymentSuccess}
        onPaymentError={handlePaymentError}
      />
    </div>
  );
};

export default CheckoutPage;