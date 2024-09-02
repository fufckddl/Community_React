// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA_wktnFvtXzXLgnHTgL5pgbdPFQcPTPzI",
    authDomain: "react-d1aea.firebaseapp.com",
    projectId: "react-d1aea",
    storageBucket: "react-d1aea.appspot.com",
    messagingSenderId: "560016855921",
    appId: "1:560016855921:web:e3f277ae940235dcc91cd0",
    measurementId: "G-26WRREC7QX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, app, storage };