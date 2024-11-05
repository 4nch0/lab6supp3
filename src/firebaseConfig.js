// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD0mIlsee1xS19OPmjYemLAiAHFUYtKqHU",
    authDomain: "lab66act.firebaseapp.com",
    databaseURL: "https://lab66act-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "lab66act",
    storageBucket: "lab66act.appspot.com", // Corrected storage bucket URL
    messagingSenderId: "913760998317",
    appId: "1:913760998317:web:0feebc571bd72e2f300724",
    measurementId: "G-KXKDR6MGSF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app); // Initialize the Realtime Database

export { database }; // Export the database instance
