// pages/_app.js

import "../node_modules/antd/dist/reset.css";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { AuthProvider } from '../contexts/AuthContext';

const stripePromise = loadStripe('pk_test_51MuQ85FYfQtbJP3nDd84h90hh8HpieVLxowKQTqINdyFTy2EW2vTlxfNwVMknPXGJyXclbiu6r1DN8aXiKk2NktL009UIS4eir');

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Elements stripe={stripePromise}>
        <Component {...pageProps} />
      </Elements>
    </AuthProvider>
  );
}

export default MyApp;