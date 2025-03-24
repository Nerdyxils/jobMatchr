import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth'; // Import authentication service

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCD3dviEWwILaA3EDnoLxVAmtUihvFcVPI",
  authDomain: "jobmatchr-f5e74.firebaseapp.com",
  projectId: "jobmatchr-f5e74",
  storageBucket: "jobmatchr-f5e74.firebasestorage.app",
  messagingSenderId: "470833725733",
  appId: "1:470833725733:web:cd683ad9f851177c5c1acc",
  measurementId: "G-7L1LXS3M06"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Set up authentication and Google provider
export const auth = getAuth(firebaseApp);
export const provider = new GoogleAuthProvider();
export default firebaseApp;
