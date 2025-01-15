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

    let clientSecret;
    if (!mutation.isPending && !mutation.data) {
      clientSecret = await mutation.mutateAsync();
    }

    if (!clientSecret) {
      setStripeError('Client secret is missing');
      return;
    }

    const { error } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });
    if (error) {
      setStripeError(error.message);
      return;
    }

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
      console.log('Transaction Id : ', paymentIntent.id);
      setStripeError('');
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
        {mutation.isLoading ? 'Loading...' : 'Pay'}
      </button>
    </form>
  );
};

export default CheckoutForm;
