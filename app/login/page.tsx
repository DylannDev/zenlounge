"use client";

import { useState } from "react";
import LoginForm from "@/components/LoginForm";
import SignupForm from "@/components/SignupForm";
import Loader from "@/components/Loader";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  return (
    <section className="max-w-[550px] w-full mx-auto py-20 flex flex-col gap-6">
      {loading && <Loader text="Redirection en cours..." fullScreen />}
      <div>
        <h1 className="text-3xl font-bold text-center mb-4">Bienvenue !</h1>
        <p className="text-center text-blue-light mb-6">
          Connectez-vous ou créez un compte pour réserver vos prestations.
        </p>
      </div>
      <div className="w-full bg-white p-0 pb-6 sm:p-6 rounded-3xl border border-rose-dark">
        {isLogin ? <LoginForm setLoading={setLoading} /> : <SignupForm />}

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
    </section>
  );
};

export default LoginPage;
