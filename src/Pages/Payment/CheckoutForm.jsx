import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../../Hooks/useAuthContext';
import { useMutation } from '@tanstack/react-query';
import Button from '../../components/Button';

const CheckoutForm = () => {
  const [stripeError, setStripeError] = useState('');
  const elements = useElements();
  const stripe = useStripe();

  const { user, notify } = useAuthContext();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { id } = useParams();

  // Generate Payment Secret
  const mutation = useMutation({
    mutationFn: async () => {
      const { data } = await axiosSecure.post('/create_payment_intent', { id });
      return data.client_secret;
    },

    onError: error => {
      setStripeError(error.message);
    },
  });

  const handlePay = async e => {
    e.preventDefault();

    const card = elements.getElement(CardElement);

    if (!stripe || !elements || card === null) {
      return;
    }

    // Load Payment Secret
    let clientSecret;
    if (!mutation.isPending && !mutation.data) {
      clientSecret = await mutation.mutateAsync();
    }
    if (!clientSecret) {
      setStripeError('Client secret is missing');
      return;
    }

    // Create Payment
    const { error } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });
    if (error) {
      setStripeError(error.message);
      return;
    }

    // Confirm Payment
    const { paymentIntent, error: stripeError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: user.displayName,
            email: user.email,
          },
        },
      });
    if (stripeError) {
      setStripeError(stripeError.message);
      notify('error', 'Payment Failed!');
    } else {
      setStripeError('');

      const transactionDetails = {
        transactionId: paymentIntent.id,
        classId: id,
        email: user.email,
      };
      const { data } = await axiosSecure.post('/transactions', {
        transactionDetails,
      });
      data.acknowledged
        ? notify('success', 'Payment Success')
        : notify('error', 'Payment Failed!');
      navigate('/dashboard/my_enrolls');
    }
  };

  return (
    <form onSubmit={handlePay}>
      <div className="border-[1.5px] border-skyBlue rounded-md p-2">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                fontFamily: "'Roboto', sans-serif",
                border: '1px solid #ccc',
                fontSmoothing: 'antialiased',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
                iconColor: '#fa755a',
              },
            },
          }}
        />
      </div>
      {stripeError && <p className="text-red-500">{stripeError}</p>}
      <Button
        className="mt-4"
        disabled={!stripe || mutation.isLoading}
        type="submit"
      >
        {mutation.isPending ? 'Loading...' : 'Pay'}
      </Button>
    </form>
  );
};

export default CheckoutForm;
