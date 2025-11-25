import { initializeApp } from "firebase/app";
import { 
  getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy 
} from "firebase/firestore";
import { 
  getStorage, ref, uploadBytes, getDownloadURL 
} from "firebase/storage";
import { 
  getAuth, signInWithEmailAndPassword, signOut 
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDsxC9uuj43HGWm3akf7RQBouMSbuPY2Ss",
  authDomain: "menu-card-22071.firebaseapp.com",
  projectId: "menu-card-22071",
  storageBucket: "menu-card-22071.firebasestorage.app",
  messagingSenderId: "65917133566",
  appId: "1:65917133566:web:fd33c8c6b88d6d65dd3baf",
  measurementId: "G-KJENZPNSHD"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

export {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  ref,
  uploadBytes,
  getDownloadURL,
  signInWithEmailAndPassword,
  signOut
};
