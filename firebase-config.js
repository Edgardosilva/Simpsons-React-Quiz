import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const API = process.env.API_KEY;

const firebaseConfig = {
    apiKey: API,
    authDomain: "simpsonsquiz-7b196.firebaseapp.com",
    projectId: "simpsonsquiz-7b196",
    storageBucket: "simpsonsquiz-7b196.appspot.com",
    messagingSenderId: "304554959604",
    appId: "1:304554959604:web:0e18a3415db144fde974a1"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const googleProvider = new GoogleAuthProvider();
  export const db = getFirestore(app);
