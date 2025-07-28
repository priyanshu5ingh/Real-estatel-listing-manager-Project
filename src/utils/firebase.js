// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAq2P-2_z1DomzCBV9zSPOGBYQRuqIutug",
  authDomain: "listig-2913b.firebaseapp.com",
  projectId: "listig-2913b",
  storageBucket: "listig-2913b.firebasestorage.app",
  messagingSenderId: "316985526985",
  appId: "1:316985526985:web:116a623793fc387a055b18",
  measurementId: "G-CPELWKZJH5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export { analytics };
export default app;
