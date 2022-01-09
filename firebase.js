import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import secrets from "./secrets.json";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = secrets.firebase;

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);