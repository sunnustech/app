import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBhp7aFiCUk2CX2O8H16sQDXWlndnQj3WE",
  authDomain: "sunnus-22.firebaseapp.com",
  projectId: "sunnus-22",
  storageBucket: "sunnus-22.appspot.com",
  messagingSenderId: "114067060360",
  appId: "1:114067060360:web:344b44892335ab139ad13d",
  measurementId: "G-V0M4GPC2H7",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);

// Please test login functionality with the following admin account:
// Email: sunnus@gmail.com
// Password: test1234
