// pages/_app.js

//import "../node_modules/antd/dist/reset.css";
import '../styles/tailwind.css';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { AuthProvider } from '../contexts/AuthContext';
import { DealsProvider } from '../contexts/DealsContext'; // Import the DealsProvider

const stripePromise = loadStripe('pk_test_51MuQ85FYfQtbJP3nDd84h90hh8HpieVLxowKQTqINdyFTy2EW2vTlxfNwVMknPXGJyXclbiu6r1DN8aXiKk2NktL009UIS4eir');

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
       <DealsProvider> {/* Wrap your app with the DealsProvider */}
        <Elements stripe={stripePromise}>
          <Component {...pageProps} />
        </Elements>
      </DealsProvider>
    </AuthProvider>
  );
}

export default MyApp;