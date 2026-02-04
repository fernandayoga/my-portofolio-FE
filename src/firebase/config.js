// src/firebase/config.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBruGnlyvRMgpkZ8oxgYyHjJsbmWaDCHdk",
  authDomain: "portofolio-web-7225f.firebaseapp.com",
  databaseURL: "https://portofolio-web-7225f-default-rtdb.firebaseio.com",
  projectId: "portofolio-web-7225f",
  storageBucket: "portofolio-web-7225f.firebasestorage.app",
  messagingSenderId: "27697188364",
  appId: "1:27697188364:web:895863e65d6501f5e72829",
  measurementId: "G-65Y40B3892"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const database = getDatabase(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();