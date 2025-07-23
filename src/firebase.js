import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB6DAHH-BQtR9st9dj0_Wl2T6OlW21kssk",
  authDomain: "birrioteca-e9e74.firebaseapp.com",
  databaseURL: "https://birrioteca-e9e74-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "birrioteca-e9e74",
  storageBucket: "birrioteca-e9e74.appspot.com",
  messagingSenderId: "199410158144",
  appId: "1:199410158144:web:9ec55e364f26c4a028ada5"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
