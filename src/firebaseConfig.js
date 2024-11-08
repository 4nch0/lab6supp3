// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, update, remove, push, child } from "firebase/database";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD0mIlsee1xS19OPmjYemLAiAHFUYtKqHU",
    authDomain: "lab66act.firebaseapp.com",
    databaseURL: "https://lab66act-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "lab66act",
    storageBucket: "lab66act.firebasestorage.app",
    messagingSenderId: "913760998317",
    appId: "1:913760998317:web:0feebc571bd72e2f300724",
    measurementId: "G-KXKDR6MGSF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, set, get, update, remove, push, child };
