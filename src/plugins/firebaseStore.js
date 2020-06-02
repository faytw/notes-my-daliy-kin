import firebase from 'firebase'
import 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: process.env.VUE_APP_FIREBASE_STORE_API_KEY,
    authDomain: process.env.VUE_APP_FIREBASE_STORE_AUTH_DOMAIN,
    databaseURL: process.env.VUE_APP_FIREBASE_STORE_DATABASE_URL,
    projectId: process.env.VUE_APP_FIREBASE_STORE_PROJECT_ID,
    storageBucket: process.env.VUE_APP_FIREBASE_STORE_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_FIREBASE_STORE_MESSAGEING_SENDER_ID,
    appId: process.env.VUE_APP_FIREBASE_STORE_APP_ID,
    measurementId: process.env.VUE_APP_FIREBASE_STORE_MEASUREMENT_ID
  }
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)
  firebase.analytics()
  
export const db = firebase.firestore()

export default {
  db,
}
