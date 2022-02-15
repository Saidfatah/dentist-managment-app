import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBc1Aha99w-S_79u2unsrJBhqdASI3-y74",
  authDomain: "dentist-app-1b7f5.firebaseapp.com",
  projectId: "dentist-app-1b7f5",
  storageBucket: "dentist-app-1b7f5.appspot.com",
  messagingSenderId: "193120942084",
  appId: "1:193120942084:web:18e522fad14d91060e5d51",
};
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
