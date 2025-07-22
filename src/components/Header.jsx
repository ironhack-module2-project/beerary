import { Link } from "react-router-dom";

function Header() {
  return (
    <div class="navbar bg-base-200 mb-10">
      <div class="flex-1"></div>

      <div class="flex-none">
        <Link to="/" className="btn btn-ghost text-xl">
          Birrioteca
        </Link>
      </div>

      <Link to="/cellar" class="flex-1 justify-end flex">
        <button class="btn btn-primary">Your Cellar</button>
      </Link>
    </div>
  );
}

export default Header;
