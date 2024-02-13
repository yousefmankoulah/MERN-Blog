// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-93eaa.firebaseapp.com",
  projectId: "mern-blog-93eaa",
  storageBucket: "mern-blog-93eaa.appspot.com",
  messagingSenderId: "966910083324",
  appId: "1:966910083324:web:d3c22a8b2fbdb505ced779"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app