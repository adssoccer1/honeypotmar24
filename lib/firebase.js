// lib/firebase.js

import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'your-api-key',
  authDomain: 'your-auth-domain',
  projectId: 'your-project-id',
  storageBucket: 'your-storage-bucket',
  messagingSenderId: 'your-messaging-sender-id',
  appId: 'your-app-id',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else{
  firebase.app(); // if already initialized, use that one
}
    
export default firebase;