// contexts/AuthContext.js

import React, { createContext, useState, useContext } from 'react';
import { auth, provider, GoogleAuthProvider } from '../lib/firebase';
import {signInWithPopup } from "firebase/auth";

const AuthContext = createContext();


const signInWithGoogle = async () => {
  console.log("inside authcontext signInWithGoogle");
  console.log("inside authcontext signInWithGoogle provider: ");
  try {
    const result = await signInWithPopup(auth, provider);
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    const userData = {
      id: user.uid,
      email: user.email,
      // Map the user's accountType based on your app's requirements
      accountType: 'newsletter' // or 'advertiser', set it according to your needs
      // Include any other relevant user data here
    };
    console.log("inside authcontext signInWithGoogle userData: ", userData);
    return userData;
  } catch(error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
    console.error('Error signing in with Google:', error);
    throw error;
  };
};



const authenticateUser = async (email, password) => {

  // For testing purposes, return dummy userData without an API call
  const userData = {
    id: 1,
    email: 'user@example.com',
    accountType: 'newsletter', // or 'advertiser' or 'newsletter'
    // Include any other relevant user data here
  };
  return userData;
  /*
  try {
    // Replace this URL with your API endpoint for user authentication
    const response = await fetch('https://your-api.com/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Authentication failed');
    }

    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Error authenticating user:', error);
    throw error;
  }
  */
};

const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    // Call your API to authenticate the user, then set the user state
    const userData = await authenticateUser(email, password);
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const loginWithGoogle = async () => {
    const userData = await signInWithGoogle();
    setUser(userData);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loginWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider, useAuthContext };
