import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
  apiKey: 'AIzaSyAmwBEEpYP6nB1rJmCqmGoLrl4dH8s220U',
  authDomain: 'pak-agro-vertical-farmin-fc4ee.firebaseapp.com',
  projectId: 'pak-agro-vertical-farmin-fc4ee',
  storageBucket: 'pak-agro-vertical-farmin-fc4ee.appspot.com',
  messagingSenderId: '93690897052',
  appId: '1:93690897052:web:08e24f198f55e5fdeb4359',
  measurementId: 'G-6657M0W1FF',
};

// Initialize Firebase
export const firebaseClient = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseClient);
