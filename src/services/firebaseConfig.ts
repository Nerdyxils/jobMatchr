import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth'; // Import authentication service

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "process.env.FIREBASE_API_KEY",
  authDomain: "jobmatchr-f5e74.firebaseapp.com",
  projectId: "jobmatchr-f5e74",
  storageBucket: "jobmatchr-f5e74.firebasestorage.app",
  messagingSenderId: "470833725733",
  appId: "1:470833725733:web:67a1602c5c9211f95c1acc",
  measurementId: "G-V2XDE3MD4Z"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Set up authentication and Google provider
export const auth = getAuth(firebaseApp);
export const provider = new GoogleAuthProvider();
export default firebaseApp;


