// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const database = getDatabase(app);

export { database, ref, onValue };