
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyChrIzaKKwjy-RpMn16G8i4bIFVpWrnNuA",
  authDomain: "appcelu-7d9f4.firebaseapp.com",
  projectId: "appcelu-7d9f4",
  storageBucket: "appcelu-7d9f4.appspot.com",
  messagingSenderId: "767550165846",
  appId: "1:767550165846:web:efc44b54986f8540a47cf7",
  measurementId: "G-S884XCHCQM"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);