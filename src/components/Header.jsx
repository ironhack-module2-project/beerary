import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

//const auth = getAuth();

function Header() {
  return (
    <div className="navbar bg-base-200 mb-10 relative justify-around">
      <div className="flex-start">
        <Link to="/about">
          <button className="btn btn-accent">About Us</button>
        </Link>
      </div>

      <div className="absolute left-1/2 transform -translate-x-1/2">
        <Link to="/" className="btn btn-ghost text-xl flex items-center gap-2">
          <img src="/barrel.png" alt="Icon" className="w-6 h-6" />
          Beerary
        </Link>
      </div>

      <div className="flex-1 flex justify-end">
        <Link to="/cellar">
          <button className="btn btn-primary">Your Cellar</button>
        </Link>
      </div>
    </div>
  );
}

export default Header;
