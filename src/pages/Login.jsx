import { useEffect } from "react";
import { auth } from "../firebase";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { GoogleAuthProvider, EmailAuthProvider } from "firebase/auth";

function Login() {
  useEffect(() => {
    console.log("Login useEffect running");

    const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);

    ui.start("#firebaseui-auth-container", {
      signInOptions: [
        GoogleAuthProvider.PROVIDER_ID,
        EmailAuthProvider.PROVIDER_ID,
      ],
      signInSuccessUrl: "/", // Redirige al home después de login 
    });

    return () => {
      ui.reset(); // Limpiar instancia al desmontar componente
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Log In</h2>
      <div id="firebaseui-auth-container"></div>
    </div>
  );
}

export default Login;
