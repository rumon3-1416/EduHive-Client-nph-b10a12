import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { useParams } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';
import Container from '../../components/Container/Container';

const stripePromise = loadStripe(import.meta.env.VITE_stripe_pk);

const Payment = () => {
  const { id } = useParams();

  return (
    <div>
      <Container>
        <section className="min-h-[80vh] flex justify-center items-center">
          <div className="w-4/5 min-w-[20rem] p-6 border border-black">
            <Elements stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default Payment;
