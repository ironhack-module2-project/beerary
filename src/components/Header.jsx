import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="navbar bg-base-200 mb-10">
      <div className="flex-1"></div>

      <div className="flex-none">
        <Link to="/" className="btn btn-ghost text-xl">
          Birrioteca
        </Link>
      </div>

      <Link to="/cellar" className="flex-1 justify-end flex">
        <button className="btn btn-primary">Your Cellar</button>
      </Link>
    </div>
  );
}

export default Header;
