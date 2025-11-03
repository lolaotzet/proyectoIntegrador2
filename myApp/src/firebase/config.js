import app from "firebase/app"
import firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyBvGU3jjbBJKh2ph81Zy8QKV5Fj6FAK5P4",
  authDomain: "myapp-cc4dd.firebaseapp.com",
  projectId: "myapp-cc4dd",
  storageBucket: "myapp-cc4dd.firebasestorage.app",
  messagingSenderId: "82061180075",
  appId: "1:82061180075:web:80cb941075db67f0cf4bee"
};

app.initializeApp(firebaseConfig)

export const auth = firebase.auth()

export const storage = app.storage()

export const db = app.firestore()