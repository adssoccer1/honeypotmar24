// pages/register.js

//this page is currently not used - instead trying to handle login + registration through components - not a separate page
import React, { useState } from 'react';
import Layout from '../components/NavigationBar';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accountType, setAccountType] = useState('newsletter');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement account creation and redirection logic
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        {/* Add email, password, account type input fields, and a submit button */}
      </form>
    </Layout>
  );
};

export default RegisterPage;
