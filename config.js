import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getDatabase} from "firebase/database";

export const firebaseConfig = {
  apiKey: "AIzaSyDkORXm0JjW8sHMx6w1_XPz8p1nZBmWHEM",
  authDomain: "storytelling-7ad3b.firebaseapp.com",
  databaseURL: "https://storytelling-7ad3b-default-rtdb.firebaseio.com",
  projectId: "storytelling-7ad3b",
  storageBucket: "storytelling-7ad3b.appspot.com",
  messagingSenderId: "699576917115",
  appId: "1:699576917115:web:bf6802ce9a33d27fd416de"
  }; 

export const provider = new GoogleAuthProvider();
const firebaseapp=initializeApp(firebaseConfig);
export const auth=getAuth(firebaseapp);
export const db= getDatabase(firebaseapp);

