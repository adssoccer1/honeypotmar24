// pages/login.js

//this page is currently not used - instead trying to handle login + registration through components - not a separate page
import React, { useState } from 'react';
import Layout from '../components/NavigationBar';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement authentication and redirection logic
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        {/* Add email and password input fields and a submit button */}
      </form>
    </Layout>
  );
};

export default LoginPage;
