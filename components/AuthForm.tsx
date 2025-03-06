"use client";

import { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import Loader from "./Loader";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <div className="w-full bg-white p-0 pb-6 sm:p-6 rounded-3xl border border-rose-dark">
        {isLogin ? <LoginForm setLoading={setLoading} /> : <SignupForm />}

        <div className="mt-4 text-center">
          <p className="text-sm text-blue-light">
            {isLogin ? "Pas encore de compte ?" : "Vous avez déjà un compte ?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-brown-dark font-semibold hover:underline"
            >
              {isLogin ? "Inscrivez-vous" : "Connectez-vous"}
            </button>
          </p>
        </div>
      </div>
      {loading && <Loader text="Redirection en cours..." fullScreen />}
    </>
  );
};

export default AuthForm;
