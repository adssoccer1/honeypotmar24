// lib/firebase.js

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import firebase from 'firebase/app';
import 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCR2Tv41m_DKlyDHvgwl5DKgb4G25WFrRM",
  authDomain: "honeypotmar24.firebaseapp.com",
  projectId: "honeypotmar24",
  storageBucket: "honeypotmar24.appspot.com",
  messagingSenderId: "494218589278",
  appId: "1:494218589278:web:a5a9b4bae4786f069d30cf",
  measurementId: "G-4MS8BNF1TK",
  databaseURL: "https://honeypotmar24-default-rtdb.firebaseio.com",
};

// Initialize Firebase
//const analytics = getAnalytics(app);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();

const db = getDatabase(app);

    
export { firebase, auth, provider, GoogleAuthProvider, signInWithPopup, db };


