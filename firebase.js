// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDB86iR2SfHXi67u33rB5dKv0dvdd6tqzw",
  authDomain: "cardenaswedding-fec56.firebaseapp.com",
  projectId: "cardenaswedding-fec56",
  storageBucket: "cardenaswedding-fec56.firebasestorage.app",
  messagingSenderId: "605412270645",
  appId: "1:605412270645:web:4c0b12b117c6376359877c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function saveRSVP(data) {
  await addDoc(collection(db, "rsvps"), {
    ...data,
    createdAt: serverTimestamp()
  });
}