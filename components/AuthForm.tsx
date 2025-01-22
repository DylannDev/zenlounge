"use client";

import { useState } from "react";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="w-full bg-white p-0 pb-6 sm:p-6 rounded-3xl border border-rose-dark">
      {isLogin ? <LoginForm /> : <SignupForm />}

      <div className="mt-4 text-center">
        <p className="text-sm text-blue-light">
          {isLogin ? "Pas encore de compte ?" : "Déjà un compte ?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-rose-dark font-semibold hover:underline"
          >
            {isLogin ? "Inscrivez-vous" : "Connectez-vous"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
