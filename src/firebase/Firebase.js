import { initializeApp } from "firebase/app";
import{getFirestore,collection} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD8S53U4NlbJRethgVVG_7VrPhD2nwY5B4",
  authDomain: "cineworld-87ca1.firebaseapp.com",
  projectId: "cineworld-87ca1",
  storageBucket: "cineworld-87ca1.appspot.com",
  messagingSenderId: "246771406148",
  appId: "1:246771406148:web:69da8269f5cd8c93313311"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const moviesRef = collection(db,"movies");
export const reviewsRef = collection(db,"reviews");
export const usersRef = collection(db,"users");

export default app;