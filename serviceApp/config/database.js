import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyClvd6vCqrLBloBc2yYUcGqmXU4EOhzFmQ",
  authDomain: "local-service-finder-app-b46cf.firebaseapp.com",
  projectId: "local-service-finder-app-b46cf",
  storageBucket: "local-service-finder-app-b46cf.firebasestorage.app",
  messagingSenderId: "23651008111",
  appId: "1:23651008111:web:eb1eaff81eeef16a6cd79a",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
