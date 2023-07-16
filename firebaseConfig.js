// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js';
import {
  getFirestore,
  setDoc,
  doc,
  getDoc,
  updateDoc,
  addDoc,
  collection,
  getDocs,
  query,
} from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC4oGrz14Lz9s9KCsAhS1LZlkR-ZiAjs8s',
  authDomain: 'hiringmine-c9b14.firebaseapp.com',
  projectId: 'hiringmine-c9b14',
  storageBucket: 'hiringmine-c9b14.appspot.com',
  messagingSenderId: '201916433897',
  appId: '1:201916433897:web:5838ea58f95a209139b778',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

export {
  auth,
  createUserWithEmailAndPassword,
  setDoc,
  doc,
  db,
  signInWithEmailAndPassword,
  getDoc,
  onAuthStateChanged,
  updateDoc,
  addDoc,
  collection,
  getDocs,
  query,
};
