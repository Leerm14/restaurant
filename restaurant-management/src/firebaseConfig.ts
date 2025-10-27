// src/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyANE_54S-4URk44n97LZCerYEvfDaWbUnU",
  authDomain: "restaurant-e7901.firebaseapp.com",
  projectId: "restaurant-e7901",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
