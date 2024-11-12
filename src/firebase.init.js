// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDiGqZz-jqEocV6lI4h3iY0o3Xzqqkyzfg",
  authDomain: "email-password-authentic-c9a22.firebaseapp.com",
  projectId: "email-password-authentic-c9a22",
  storageBucket: "email-password-authentic-c9a22.firebasestorage.app",
  messagingSenderId: "1014127421177",
  appId: "1:1014127421177:web:e0a2ea9ef2dd95ebd2a428",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
