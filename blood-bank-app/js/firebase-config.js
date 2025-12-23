// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5SUAwMlWuXoWTChmh-LN76LxE56B0cLU",
  authDomain: "blood-bank-17.firebaseapp.com",
  projectId: "blood-bank-17",
  storageBucket: "blood-bank-17.firebasestorage.app",
  messagingSenderId: "1057545309574",
  appId: "1:1057545309574:web:02fd3d4bf7caf17ee77007",
  measurementId: "G-JF4TYRRR69"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);