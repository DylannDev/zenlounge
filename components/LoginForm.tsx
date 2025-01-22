"use client";

import React, { useState } from "react";
import Button from "@/components/Button";
import { loginFormFields } from "@/data/LoginForm.config";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Réinitialise l'erreur quand l'utilisateur modifie un champ
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // const response = await signIn(formData.email, formData.password);

    // if (!response.success) {
    //   setError(response.message || "Erreur de connexion");
    // }
  };

  const handleGoogleSignIn = async () => {
    // const response = await signIn("google");
    // if (!response.success) {
    //   setError(response.message || "Erreur de connexion avec Google");
    // }
  };

  return (
    <div className="w-full p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Connexion</h2>

      <form onSubmit={handleSubmit} className="space-y-6 w-full">
        {loginFormFields.map((field) => (
          <div key={field.id}>
            <label
              htmlFor={field.id}
              className="block text-sm font-medium text-blue-light mb-2"
            >
              {field.label} <span className="text-red-500">*</span>
            </label>
            <input
              id={field.id}
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              value={formData[field.name as keyof typeof formData]}
              onChange={handleFormChange}
              required={field.required}
              className="border border-blue-light/20 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-rose-dark"
            />
          </div>
        ))}

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <Button
          button
          type="submit"
          color="rose"
          responsiveWidth={{ default: "large" }}
        >
          Se connecter
        </Button>
      </form>

      {/* Barre de séparation */}
      <div className="flex items-center my-6">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="px-3 text-gray-500 text-sm">ou</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      {/* Connexion Google */}
      <Button
        button
        onClick={handleGoogleSignIn}
        color="empty"
        responsiveWidth={{ default: "large" }}
      >
        Connexion avec Google
      </Button>
    </div>
  );
};

export default LoginForm;
