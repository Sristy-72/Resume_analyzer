
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCjHHGhMi3VGSGhffythwZFoadhHcrmwcA",
  authDomain: "mernai-12bdc.firebaseapp.com",
  projectId: "mernai-12bdc",
  storageBucket: "mernai-12bdc.firebasestorage.app",
  messagingSenderId: "78709201145",
  appId: "1:78709201145:web:cf0bf778c0be32af216a28",
  measurementId: "G-9465TFS649"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {auth, provider};

