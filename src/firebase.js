// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {} from "firebase/storage";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvJIfe7iJRVm8kCVaPV2ABYZGzNgacmrQ",
  authDomain: "microproyecto2-6b343.firebaseapp.com",
  projectId: "microproyecto2-6b343",
  storageBucket: "microproyecto2-6b343.appspot.com",
  messagingSenderId: "862071727316",
  appId: "1:862071727316:web:af6185041f0fb6f4490741"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

 export const googleProvider = new GoogleAuthProvider();