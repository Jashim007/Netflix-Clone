import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyB-KDYc-eSgQtY-PPHSsfy4uLuM6r0pXM8",
  authDomain: "netflix--clone-yt.firebaseapp.com",
  projectId: "netflix--clone-yt",
  storageBucket: "netflix--clone-yt.appspot.com",
  messagingSenderId: "935579805941",
  appId: "1:935579805941:web:d5d1caa4fb49c1fd81bdbc",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth };
export default db;
