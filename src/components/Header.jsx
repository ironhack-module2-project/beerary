import { Link } from "react-router-dom";

function Header(props) {
  return (
    <div className="navbar bg-base-200 mb-10">
      <div className="flex-1"></div>

      <div className="flex-none">
        <Link to="/" className="btn btn-ghost text-xl">
          <img src="/barrel.png" alt="Icon" className="w-6 h-6" />
          Birrioteca
        </Link>
      </div>

      <Link to="/cellar" className="flex-1 justify-end flex">
        <button className="btn btn-primary">Your Cellar</button>
      </Link>
   
      <Link to="/login" className="flex-1 justify-end flex">
        <button className="btn btn-secondary">Log In</button>
      </Link>
    </div>
  );
}

export default Header;
