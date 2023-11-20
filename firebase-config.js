import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDy8YhWXcnVXlHflKEbyPSvHW54PZw8m3A",
    authDomain: "simpsons-quiz-e7727.firebaseapp.com",
    projectId: "simpsons-quiz-e7727",
    storageBucket: "simpsons-quiz-e7727.appspot.com",
    messagingSenderId: "596237228780",
    appId: "1:596237228780:web:61bd0404147113e33c23c9"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const googleProvider = new GoogleAuthProvider();
  export const db = getFirestore(app);
