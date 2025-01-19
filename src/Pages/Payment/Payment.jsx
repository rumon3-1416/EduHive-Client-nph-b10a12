import React, { useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';
import Container from '../../components/Container/Container';

const stripePromise = loadStripe(import.meta.env.VITE_stripe_pk);

const Payment = () => {
  useEffect(() => {
    document.title = 'Payment | EduHive';
  }, []);

  return (
    <div className="bg-blueBg">
      <Container>
        <section className="min-h-[80vh] flex justify-center items-center">
          <div className="bg-white w-4/5 min-w-[20rem] p-6 rounded-xl shadow-xl">
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
