"use client";

import { useState } from "react";
import LoginForm from "../LoginForm";
import Loader from "../Loader";

const AuthForm = () => {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <div className="w-full bg-white p-0 pb-6 sm:p-6 rounded-3xl border border-rose-dark">
        {<LoginForm setLoading={setLoading} isAdminForm />}
      </div>
      {loading && <Loader text="Redirection en cours..." fullScreen />}
    </>
  );
};

export default AuthForm;
