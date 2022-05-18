import { initializeApp, getApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getFunctions } from 'firebase/functions'

const FIREBASE_APIKEY="AIzaSyBhp7aFiCUk2CX2O8H16sQDXWlndnQj3WE"
const FIREBASE_AUTHDOMAIN='sunnus-22.firebaseapp.com'
const FIREBASE_PROJECTID='sunnus-22'
const FIREBASE_STORAGEBUCKET='sunnus-22.appspot.com'
const FIREBASE_MESSAGINGSENDERID='114067060360'
const FIREBASE_APPID='1:114067060360:web:344b44892335ab139ad13d'
const FIREBASE_MEASUREMENTID='G-V0M4GPC2H7'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_APIKEY,
//   authDomain: process.env.FIREBASE_AUTHDOMAIN,
//   projectId: process.env.FIREBASE_PROJECTID,
//   storageBucket: process.env.FIREBASE_STORAGEBUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
//   appId: process.env.FIREBASE_APPID,
//   measurementId: process.env.FIREBASE_MEASUREMENTID,
// }
const firebaseConfig = {
  apiKey: FIREBASE_APIKEY,
  authDomain: FIREBASE_AUTHDOMAIN,
  projectId: FIREBASE_PROJECTID,
  storageBucket: FIREBASE_STORAGEBUCKET,
  messagingSenderId: FIREBASE_MESSAGINGSENDERID,
  appId: FIREBASE_APPID,
  measurementId: FIREBASE_MEASUREMENTID,
}

// Initialize Firebase
let app
if (getApps.length === 0) {
  app = initializeApp(firebaseConfig)
  console.debug('firebase: initialized') // perma
} else {
  console.debug('firebase: continued') // perma
  app = getApp()
}

const auth = getAuth(app)
const db = getFirestore(app)
const functions = getFunctions(app)

export { auth, db, functions }
