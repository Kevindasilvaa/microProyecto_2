// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {} from "firebase/storage";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASZDKLYdZafSz-1qt0Jkwn3VXymmZ4nKo",
  authDomain: "microproyecto2-9a32d.firebaseapp.com",
  projectId: "microproyecto2-9a32d",
  storageBucket: "microproyecto2-9a32d.appspot.com",
  messagingSenderId: "792497220961",
  appId: "1:792497220961:web:39382429a0592dfec3a920"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();