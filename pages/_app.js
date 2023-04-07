// pages/_app.js

import '../styles/globals.css';
import '../styles/tailwind.css';
import "../node_modules/antd/dist/reset.css";

import { AuthProvider } from '../contexts/AuthContext';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;

