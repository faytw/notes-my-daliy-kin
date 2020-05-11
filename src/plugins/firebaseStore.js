import firebase from 'firebase'
import 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCPNDiQ9u_4GQ85g33_4qy7YAVjC2x1J6Q",
    authDomain: "timeisart-676d9.firebaseapp.com",
    databaseURL: "https://timeisart-676d9.firebaseio.com",
    projectId: "timeisart-676d9",
    storageBucket: "timeisart-676d9.appspot.com",
    messagingSenderId: "350137251991",
    appId: "1:350137251991:web:51c6f851ca9fd7b8d891d2",
    measurementId: "G-RJ2KW84R5Z"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  
export const db = firebase.firestore()

export default {
    db
}
