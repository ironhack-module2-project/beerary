import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
//import { onAuthStateChanged, signOut } from "firebase/auth";

//import { auth } from "./firebase";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AboutUs from "./pages/AboutUs";
import Cellar from "./pages/Cellar";
import BeerList from "./pages/BeerList";
//import Login from "./pages/Login";
import axios from "axios";
import EditBeer from "./pages/EditBeer";

const API_URL =
  "https://birrioteca-e9e74-default-rtdb.europe-west1.firebasedatabase.app";

const handleSubmit = (beerObj) => {
  beerObj.rating = 0;
  beerObj.review = "";
  axios
    .post(`${API_URL}/beers.json`, beerObj)
    .then(() => {
      // console.log("Success on POST");
      // showToastSuccess();
    })
    .catch((error) => {
      console.log("ERROR on POST: ", error);
      // showToastFailure();
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
  // container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
};

function App() {
  return (
    <div className="text-center">
      <Header />

      {/* Rutas */}
      <Routes>
        <Route path="/" element={<HomePage handleSubmit={handleSubmit} />} />
        <Route
          path="/beers"
          element={<BeerList handleSubmit={handleSubmit} />}
        />
        <Route path="/cellar" element={<Cellar />} />
        <Route path="/cellar/:beerId" element={<EditBeer />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
