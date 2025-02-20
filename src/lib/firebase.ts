// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYQ6QEEPbERXvFrgx6NMkZus-rzvZqv10",
  authDomain: "ugo-s-bakery.firebaseapp.com",
  projectId: "ugo-s-bakery",
  storageBucket: "ugo-s-bakery.firebasestorage.app",
  messagingSenderId: "790466678401",
  appId: "1:790466678401:web:62b100e4ee002e8251c780",
  measurementId: "G-DLLY1JC1PK"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
export const db = getFirestore(app);