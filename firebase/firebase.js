import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc,getDoc , setDoc, collection, addDoc, query, where, onSnapshot, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBPXPQQmmrNe_YNTGM3-kFafR3_1xUI1hU",
    authDomain: "olx-ebad.firebaseapp.com",
    projectId: "olx-ebad",
    storageBucket: "olx-ebad.appspot.com",
    messagingSenderId: "108166087263",
    appId: "1:108166087263:web:117fc4e7e16cbf004211ea"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export { auth, storage, db, ref,getDoc , uploadBytesResumable, query, where, onSnapshot, getDownloadURL, updateDoc, doc, setDoc, collection, addDoc, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut };