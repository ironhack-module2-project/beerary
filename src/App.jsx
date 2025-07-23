import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";

import { auth } from "./firebase";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AboutUs from "./pages/AboutUs";
import Cellar from "./pages/Cellar";
import BeerList from "./pages/BeerList";
import Login from "./pages/Login";
import axios from "axios";

const API_URL =
  "https://birrioteca-e9e74-default-rtdb.europe-west1.firebasedatabase.app";

const handleSubmit = (beerObj) => {
  axios
    .post(`${API_URL}/beers.json`, beerObj)
    .then(() => {
      console.log("Success on POST");
      showToastSuccess();
    })
    .catch((error) => {
      console.log("ERROR on POST: ", error);
      showToastFailure();
    });
};

const showToastSuccess = () => {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = "alert alert-success";
  toast.innerHTML = "<span>Beer Added Successfully.</span>";
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
};

const showToastFailure = () => {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = "alert alert-error";
  toast.innerHTML = "<span>Error on adding beer</span>";
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
};

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Detectar sesión activa
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log(currentUser)
    });
    return () => unsubscribe();
  }, []);

  // Logout
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("Sesión cerrada");
        navigate("/");
      })
      .catch((error) => console.error("Error al cerrar sesión:", error));
  };

  return (
    <div className="text-center">
      {/* Contenedor para toasts */}
      <div id="toast-container" className="fixed top-2 right-2 z-50"></div>

      {/* Header con estado user y logout */}
      <Header user={user} onLogout={handleLogout} />

      {/* Rutas */}
      <Routes>
        <Route path="/" element={<HomePage handleSubmit={handleSubmit} />} />
        <Route path="/beers" element={<BeerList handleSubmit={handleSubmit} />} />
        <Route path="/cellar" element={<Cellar />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
