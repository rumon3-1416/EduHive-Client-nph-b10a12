import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../../Hooks/useAuthContext';

const CheckoutForm = () => {
  const [paymentSecret, setPaymentSecret] = useState('');
  const [stripeError, setStripeError] = useState('');

  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const { user } = useAuthContext();

  useEffect(() => {
    axiosSecure
      .post('/create_payment_intent', { id })
      .then(res => setPaymentSecret(res.data.client_secret));
  }, [axiosSecure, id]);

  const handlePay = async e => {
    e.preventDefault();

    const card = elements.getElement(CardElement);

    if (!stripe || !elements || card === null) {
      console.log('hi');
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      setStripeError(error.message);
    } else {
      setStripeError('');
    }

    const { paymentIntent, error: stripeError } =
      await stripe.confirmCardPayment(paymentSecret, {
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
      console.log(paymentIntent);
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
        disabled={!stripe || !paymentSecret}
        type="submit"
      >
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;
