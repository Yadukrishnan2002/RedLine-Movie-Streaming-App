// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from 'firebase'
import firestore from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpydt5ts-GdA8X1-tvlEnZenWERF51n_w",
  authDomain: "movie-streaming-app-35625.firebaseapp.com",
  projectId: "movie-streaming-app-35625",
  storageBucket: "movie-streaming-app-35625.appspot.com",
  messagingSenderId: "665062767124",
  appId: "1:665062767124:web:8dca51adb913aaff5f4501"
};

let app;
if(firebase.apps.length === 0)
 {
     app = firebase.initializeApp(firebaseConfig);
 }
 else{
     app = firebase.app()
 }

const auth = firebase.auth()
const db = firebase.firestore()

export {firebase, db, auth}