// contexts/AuthContext.js


//This class currently handles the google auth sign in, but needs a lot of cleaning up. 

import React, { createContext, useState, useContext } from 'react';
import { auth, provider, GoogleAuthProvider, db } from '../lib/firebase';
import {signInWithPopup, getAdditionalUserInfo, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { ref, set, get, update, once } from 'firebase/database';


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
  
  
  const signUpWithGoogleAuth = async (accountType) => {
    console.log("inside authcontext signInWithGoogle, accountType, ", accountType);
    try {
  
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log("inside authcontext signInWithGoogle, user, ", user);

      // Check if the user already exists in the database
      const userRef2 = ref(db, `users/${user.uid}`);
      const snapshot = await get(userRef2);
      const existingUser = snapshot.val();

      console.log("inside authcontext existingUser, ", existingUser);

      // If the user already exists with the same email and account type, sign them in
      if (existingUser && existingUser.email === user.email && existingUser.accountType === accountType) {
        console.log('User already exists. Signing in.');
        setUser(existingUser);
        return { success: true };
      }

      console.log("result after regster goog", result);
      await updateProfile(auth.currentUser, {
        accountType: accountType,
      });

      //put user into the db

      console.log(" and the user ", user);

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
        about:""
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
      // ...
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
        about:""

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
    <AuthContext.Provider value={{ user, login, logout, loginWithGoogle, register, signUpWithGoogleAuth, signInWithGoogleAuth, signIn }}>
      {children}
    </AuthContext.Provider>
  );   
};

export { AuthContext, AuthProvider, useAuthContext };
