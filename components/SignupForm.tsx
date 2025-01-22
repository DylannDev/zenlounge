"use client";

import React, { useState } from "react";
import Button from "@/components/Button";
import { signupFormFields } from "@/data/LoginForm.config";

const SignupForm = () => {
  const [formData, setFormData] = useState(
    Object.fromEntries(signupFormFields.map((field) => [field.name, ""]))
  );

  const [error, setError] = useState("");

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // const response = await signup(formData);
    // if (!response.success) setError(response.message || "Erreur d'inscription");
  };

  return (
    <div className="w-full p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Inscription</h2>

      <form onSubmit={handleSubmit} className="space-y-6 w-full">
        {/* Champs d'inscription */}
        <div className="flex flex-col gap-4">
          {/* Première ligne : Prénom + Nom */}
          <div className="flex flex-col sm:flex-row gap-4">
            {signupFormFields.slice(0, 2).map((field) => (
              <div key={field.name} className="w-full sm:w-1/2">
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
                  value={formData[field.name]}
                  onChange={handleFormChange}
                  required={field.required}
                  className="border border-blue-light/20 rounded-lg px-4 py-2 w-full focus:outline-none"
                />
              </div>
            ))}
          </div>

          {/* Autres champs en colonne */}
          {signupFormFields.slice(2).map((field) => (
            <div key={field.name} className="w-full">
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
                value={formData[field.name]}
                onChange={handleFormChange}
                required={field.required}
                className="border border-blue-light/20 rounded-lg px-4 py-2 w-full focus:outline-none"
              />
            </div>
          ))}
        </div>

        {/* Gestion des erreurs */}
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        {/* Bouton Inscription */}
        <Button button type="submit" color="rose">
          S'inscrire
        </Button>
      </form>
    </div>
  );
};

export default SignupForm;
