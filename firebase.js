import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7Ym-mGcN5iEb2nRtDRu72kE3axcqx9xo",
  authDomain: "myecommerce-48bb5.firebaseapp.com",
  projectId: "myecommerce-48bb5",
  storageBucket: "myecommerce-48bb5.appspot.com",
  messagingSenderId: "91659819637",
  appId: "1:91659819637:web:6cad40cffacf16aaabb63c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
