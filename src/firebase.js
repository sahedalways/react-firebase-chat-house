import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCgeg9ixSv_cMnDHQDxyYnBD6HiLZ6OiAU",
  authDomain: "chathouse-58f3f.firebaseapp.com",
  projectId: "chathouse-58f3f",
  storageBucket: "chathouse-58f3f.appspot.com",
  messagingSenderId: "671911482898",
  appId: "1:671911482898:web:686587a6a153218b39eacb",
  measurementId: "G-122YYFJ79S",
};

//Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

export { auth, db };
