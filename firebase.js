import { initializeApp, getApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getFunctions } from 'firebase/functions'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: process.env.FIREBASE_AUTHDOMAIN,
  projectId: process.env.FIREBASE_PROJECTID,
  storageBucket: process.env.FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
  appId: process.env.FIREBASE_APPID,
  measurementId: process.env.FIREBASE_MEASUREMENTID,
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
