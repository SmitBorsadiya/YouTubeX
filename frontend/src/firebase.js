import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCLRyfv3fEDwBswjMXwlRppAWAsMLrkoRY",
  authDomain: "video-6851b.firebaseapp.com",
  projectId: "video-6851b",
  storageBucket: "video-6851b.appspot.com",
  messagingSenderId: "786659990797",
  appId: "1:786659990797:web:e6fbfb93540afc2dec2444"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;