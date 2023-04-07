// contexts/AuthContext.js

import React, { createContext, useState, useContext } from 'react';
import { auth, provider, GoogleAuthProvider, db } from '../lib/firebase';
import {signInWithPopup, getAdditionalUserInfo } from "firebase/auth";
import { ref, set, get, update } from 'firebase/database';

const AuthContext = createContext();

const askUserAccountType = async (user) => {
  const accountType = prompt("Are you creating a 'newsletter' or 'advertiser' account?");

  let additionalInfo = {};

  if (accountType === 'newsletter') {
    additionalInfo.accountType = 'newsletter';
  }else{
    const shopifyLink = prompt("Please provide a link to your Shopify store.");
    additionalInfo.shopifyLink = shopifyLink;
    additionalInfo.accountType = 'advertiser';
  }

  additionalInfo.email = user.email;
  additionalInfo.dateCreated = new Date().toJSON();
  additionalInfo.verified  = false;


  const userRef = ref(db, `users/${user.uid}`);
  await update(userRef, { accountType, ...additionalInfo });

  return { accountType, ...additionalInfo };
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


  const signInWithGoogle = async () => {
    console.log("inside authcontext signInWithGoogle");
    try {
  
      const result = await signInWithPopup(auth, provider);
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      const additionalUserInfo = getAdditionalUserInfo(result);
      console.log("need to get rid of isNewUser here as could cause disagreements between ourdb and firebases auth. instead we will prompt users for verify level info when they try to interact with the leaderboard. ");

      const isNewUser = additionalUserInfo.isNewUser;
      console.log("inside authcontext signInWithGoogle user and isNewUser: ", user, " ", isNewUser);
  
      let additionalData = {};
      if (isNewUser) {
        console.log("inside authcontext signInWithGoogle popup");
  
        additionalData = await askUserAccountType(user);
      } else {
        console.log("inside authcontext signInWithGoogle get uid");
  
        const userRef = ref(db, `users/${user.uid}`);
        const snapshot = await get(userRef);
        additionalData = snapshot.val();
      }
      console.log("inside authcontext signInWithGoogle additionalData: ", additionalData);
  
      if (!additionalData || !additionalData.accountType || (additionalData.accountType === "advertiser" && !additionalData.shopifyLink)) {
        console.log("inside authcontext signInWithGoogle getpopup");
  
        additionalData = await askUserAccountType(user);
      }
  
      const userData = {
        id: user.uid,
        email: user.email,
        ...additionalData,
              // Include any other relevant user data here
  
      };
      console.log("inside authcontext signInWithGoogle userData: ", userData);
      return userData;
    } catch (error) {
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
    
    }
  };
  
  
  
  const authenticateUser = async (email, password) => {
  
    // For testing purposes, return dummy userData without an API call
    const userData = {
      id: 1,
      email: 'user@example.com',
      accountType: 'advertiser', // or 'advertiser' or 'newsletter'
      // Include any other relevant user data here
    };
    return userData;
  };

  

  

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
