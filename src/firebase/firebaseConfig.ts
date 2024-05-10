import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCvpeV9ZbkPe32TTx-UZKB1zu6Gbjpr2Ws",
  authDomain: "labour-v1.firebaseapp.com",
  projectId: "labour-v1",
  storageBucket: "labour-v1.appspot.com",
  messagingSenderId: "649305389217",
  appId: "1:649305389217:web:45c878ca11108297d998e0"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

export const postsColRef = collection(db, "posts");