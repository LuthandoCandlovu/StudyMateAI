import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCYMGwBHJ15Z_y8ychbqe4L114SgFLJKr4",
  authDomain: "studymateai-9364f.firebaseapp.com",
  projectId: "studymateai-9364f",
  storageBucket: "studymateai-9364f.firebasestorage.app",
  messagingSenderId: "248123491031",
  appId: "1:248123491031:web:5488badaca29bd4a31e692"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
