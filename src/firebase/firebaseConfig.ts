import { initializeApp } from "firebase/app";
import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { ContractorPost, User } from "../utils/types";

const firebaseConfig = {
  apiKey: "AIzaSyCvpeV9ZbkPe32TTx-UZKB1zu6Gbjpr2Ws",
  authDomain: "labour-v1.firebaseapp.com",
  projectId: "labour-v1",
  storageBucket: "labour-v1.appspot.com",
  messagingSenderId: "649305389217",
  appId: "1:649305389217:web:45c878ca11108297d998e0",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

export function firebaseSignout() {
  signOut(auth);
}

export async function createAccount(
  email: string,
  password: string,
  type: number,
  name: string
) {
  const res = await createUserWithEmailAndPassword(auth, email, password);
  const userCreds = res.user;
  const docRef = doc(db, "userdetails", userCreds.uid);
  await setDoc(docRef, { type, name });
  const user: User = {
    email: res.user.email || "",
    name,
    type,
    id: userCreds.uid,
  };
  return user;
}

export async function login(email: string, password: string) {
  const userCreds = (await signInWithEmailAndPassword(auth, email, password))
    .user;
  const docRef = doc(db, "userdetails", userCreds.uid);
  const response = await getDoc(docRef);
  const userdetails = { ...response.data() } as { type: number; name: string };
  const user: User = {
    email: userCreds.email || "",
    name: userdetails.name,
    type: userdetails.type,
    id: userCreds.uid,
  };
  return user;
}

export async function createContratorPost(
  uid: string,
  title: string,
  phone: string,
  description: string,
  labourCount: number
) {
  const docRef = doc(db, "contractorposts", uid);
  await setDoc(docRef, { title, phone, description, labourCount });
}

export async function updateContractorPost(
  uid: string,
  dataToUpdate: {
    title?: string;
    phone?: string;
    description?: string;
    labourCount?: number;
  }
) {
  const docRef = doc(db, "contractorposts", uid);
  await updateDoc(docRef, dataToUpdate);
}

export async function getContractorPost(uid: string) {
  const docRef = doc(db, "contractorposts", uid);
  const response = await getDoc(docRef);
  const postDetails = { ...response.data() };
  if (Object.keys(postDetails).length === 0) {
    throw { code: "empty" };
  }
  const UserPost = { ...postDetails, id: response.id } as ContractorPost;
  return UserPost;
}
