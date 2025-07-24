import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// import { onAuthStateChanged, signOut } from "firebase/auth";
// import { getAuth } from "firebase/auth";

//const auth = getAuth();

function Header() {
  // const [user, setUser] = useState(null);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
  //     setUser(firebaseUser);
  //   });
  //   return () => unsubscribe();
  // }, []);

  // const handleLogout = () => {
  //   signOut(auth)
  //     .then(() => {
  //       setUser(null);
  //       navigate("/login"); // Redirigir a login tras cerrar sesión
  //     })
  //     .catch((error) => {
  //       console.error("Error al cerrar sesión:", error);
  //     });
  // };

  return (
    <div className="navbar bg-base-200 mb-10">
      <div className="flex-1"></div>

      <div className="flex-none">
        <Link to="/" className="btn btn-ghost text-xl flex items-center gap-2">
          <img src="/barrel.png" alt="Icon" className="w-6 h-6" />
          Beerary
        </Link>
      </div>

      <Link to="/cellar" className="flex-1 justify-end flex">
        <button className="btn btn-primary">Your Cellar</button>
      </Link>

      {/* <div className="flex-1 justify-end flex">
        {user ? (
          <button onClick={handleLogout} className="btn btn-secondary">
            Log Out
          </button>
        ) : (
          // <Link to="/login">
          //   <button className="btn btn-secondary">Log In</button>
          // </Link>
        )}
      </div> */}
    </div>
  );
}

export default Header;
