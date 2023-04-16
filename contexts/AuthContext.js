// contexts/AuthContext.js


//This class currently handles the google auth sign in, but needs a lot of cleaning up. 

import React, { createContext, useState, useContext } from 'react';
import { auth, provider, GoogleAuthProvider, db } from '../lib/firebase';
import {signInWithPopup, getAdditionalUserInfo, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { ref, set, get, update, once } from 'firebase/database';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signUpWithGoogleAuth = async (accountType) => {
    console.log("inside authcontext signInWithGoogle, accountType, ", accountType);
    try {
  
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      // Check if the user already exists in the database
      const userRef2 = ref(db, `users/${user.uid}`);
      const snapshot = await get(userRef2);
      const existingUser = snapshot.val();

      // If the user already exists with the same email and account type, sign them in
      if (existingUser && existingUser.email === user.email && existingUser.accountType === accountType) {
        setUser(existingUser);
        return { success: true };
      }

      await updateProfile(auth.currentUser, {
        accountType: accountType,
      });

      //put user into the db
      const userData = {
        id: user.uid,
        email: user.email,
        emailVerified: true,
        verified: false,
        dateCreated: new Date().toJSON(),
        accountType,
        shopifyUrl: "",
        shopifyUrlVerified: false,
        shopifyAppInstalled: false,
        newsletterUrl: "",
        newsletterUrlVerified: false,
        twitterAccount: "",
        linkedinAccount: "",
        numDealsPosted: 0,
        numUniqueLinksGenerated:0,
        vipAccount:false,
        phoneNumber: "",
        leaderboardVerified: false,
        stripeVerified: false,
        shopurlpending: false,
        stripeId: "",
        country: "",
        optInMarketingEmails: true,
        about:"",
        stripeAddLater: false,

        // Include any other relevant user data here
      };


      const userRef = ref(db, `users/${user.uid}`);
      await update(userRef, userData );

      setUser(userData);
      return { success: true };
    } catch (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.error('Error registering user:', error);
      throw error;
      //return { success: false, error: error.message };
    }
  };
   
  const signInWithGoogleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
  
      console.log("inside authcontext signInWithGoogle, user, ", user);
  
      // Check if the user already exists in the database
      const userRef = ref(db, `users/${user.uid}`);
      const snapshot = await get(userRef);
      const existingUser = snapshot.val();
  
      console.log("inside authcontext existingUser, ", existingUser);
  
      // If the user already exists with the same email, sign them in
      if (existingUser && existingUser.email === user.email) {
        console.log('User already exists. Signing in.');
        setUser(existingUser);
        return { success: true };
      } else {
        throw new Error('User does not exist in the database. Please sign up.');
      }
    } catch (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Error signing in with Google:', error);
      throw error;
    }
  };

  const register = async (email, password, accountType) => {
    console.log("at regster at authcountxt w emal: ", email, " and pwrd ", password, " and dsplayname ", accountType);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      console.log("result after regster ", result);
      await updateProfile(auth.currentUser, {
        accountType: accountType,
      });

      //put user into the db
      const user = result.user;

      console.log(" and the user ", user);

      const userData = {
        id: user.uid,
        email: user.email,
        emailVerified: false,
        verified: false,
        dateCreated: new Date().toJSON(),
        accountType,
        shopifyUrl: "",
        shopifyUrlVerified: false,
        shopifyAppInstalled: false,
        newsletterUrl: "",
        newsletterUrlVerified: false,
        twitterAccount: "",
        linkedinAccount: "",
        numDealsPosted: 0,
        numUniqueLinksGenerated:0,
        vipAccount:false,
        phoneNumber: "",
        leaderboardVerified: false,
        stripeVerified: false,
        shopurlpending: false,
        stripeId: "",
        country: "",
        optInMarketingEmails: true,
        about:"",
        stripeAddLater: false,

        // Include any other relevant user data here
      };

      const userRef = ref(db, `users/${user.uid}`);
      await update(userRef, userData );

      setUser(userData);

      return { success: true };
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
      //return { success: false, error: error.message };
    }
  };

const signIn = async (email, password) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const user = result.user;

    console.log("inside authcontext signIn, user, ", user);

    // Check if the user already exists in the database
    const userRef = ref(db, `users/${user.uid}`);
    const snapshot = await get(userRef);
    const existingUser = snapshot.val();

    console.log("inside authcontext existingUser, ", existingUser);

    // If the user already exists with the same email, sign them in
    if (existingUser && existingUser.email === user.email) {
      console.log('User already exists. Signing in.');
      setUser(existingUser);
      return { success: true };
    } else {
      throw new Error('User does not exist in the database. Please sign up.');
    }
  } catch (error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error('Error signing in with email and password:', error);
    throw error;
  }
};

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, logout, register, setUser, signUpWithGoogleAuth, signInWithGoogleAuth, signIn }}>
      {children}
    </AuthContext.Provider>
  );   
};

export { AuthContext, AuthProvider, };
