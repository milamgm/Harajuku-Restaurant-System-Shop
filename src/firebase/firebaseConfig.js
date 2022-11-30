import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtB0cZ5t1bFGVQDT9EP397gqCdOKoVUg8",
  authDomain: "harajuku-b44c9.firebaseapp.com",
  projectId: "harajuku-b44c9",
  storageBucket: "harajuku-b44c9.appspot.com",
  messagingSenderId: "801741078276",
  appId: "1:801741078276:web:ae0bce7d86cfe664b8da51"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;

/*
 apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID
*/