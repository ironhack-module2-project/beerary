import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AboutUs from "./pages/AboutUs";
import Cellar from "./pages/Cellar";

function App() {
  return (
    <div className="text-center">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cellar" element={<Cellar />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
