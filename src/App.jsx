import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AboutUs from "./pages/AboutUs";
import Cellar from "./pages/Cellar";
import BeerList from "./pages/beerList";

import axios from "axios";

const API_URL =
  "https://birrioteca-e9e74-default-rtdb.europe-west1.firebasedatabase.app";

const handleSubmit = (beerObj) => {
  axios
    .post(`${API_URL}/beers.json`, beerObj)
    .then((response) => {
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
  toast.innerHTML = "<span>Beer Added Succesfully.</span>";

  container.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 3000);
};

const showToastFailure = () => {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = "alert alert-error";
  toast.innerHTML = "<span>Error on adding beer</span>";

  container.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 3000);
};

function App() {
  return (
    <div className="text-center">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage handleSubmit={handleSubmit} />} />
        <Route
          path="/beers"
          element={<BeerList handleSubmit={handleSubmit} />}
        />
        <Route path="/cellar" element={<Cellar />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
