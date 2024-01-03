// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCp7GLp5lEcg_qrvfFlpLNIIy_hri1AzYg",
  authDomain: "capstone-wdd.firebaseapp.com",
  projectId: "capstone-wdd",
  storageBucket: "capstone-wdd.appspot.com",
  messagingSenderId: "779411098669",
  appId: "1:779411098669:web:62b8665ae21ee40fd67ca4"
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

export default firebaseApp