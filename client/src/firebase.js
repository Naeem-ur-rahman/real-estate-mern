// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-71f87.firebaseapp.com",
  projectId: "mern-estate-71f87",
  storageBucket: "mern-estate-71f87.firebasestorage.app",
  messagingSenderId: "565274715490",
  appId: "1:565274715490:web:1d72e13c55e98aad34b83b",
  measurementId: "G-YFHP11Z13G"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);