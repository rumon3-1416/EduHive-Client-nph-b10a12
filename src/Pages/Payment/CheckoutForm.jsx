import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../../Hooks/useAuthContext';
import { useMutation } from '@tanstack/react-query';

const CheckoutForm = () => {
  const [stripeError, setStripeError] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const { user } = useAuthContext();

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
    } else {
      setStripeError('');

      const transactionDetails = {
        transactionId: paymentIntent.id,
        classId: id,
        email: user.email,
      };
      axiosSecure.post('/transactions', { transactionDetails });
    }
  };

  return (
    <form onSubmit={handlePay}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      {stripeError && <p className="text-red-500">{stripeError}</p>}
      <button
        className="btn btn-success"
        disabled={!stripe || mutation.isLoading}
        type="submit"
      >
        {mutation.isPending ? 'Loading...' : 'Pay'}
      </button>
    </form>
  );
};

export default CheckoutForm;
