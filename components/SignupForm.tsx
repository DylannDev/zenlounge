"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/Button";
import Loader from "@/components/Loader";
import { signupFormFields } from "@/data/LoginForm.config";
import { signupSchema } from "@/validation/Login";
import { useRouter } from "next/navigation";
import { signUp } from "@/actions/authActions";
import { signIn } from "@/actions/authClient";

const SignupForm = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: any) => {
    setError("");

    // Étape 1 : Inscription
    const signUpResponse = await signUp(data);

    if (!signUpResponse.success) {
      setError(signUpResponse.message || "Erreur d'inscription");
      return;
    }

    // Étape 2 : Connexion automatique après inscription
    const signInResponse = await signIn(data.email, data.password);

    if (!signInResponse.success) {
      setError(
        signInResponse.message || "Erreur de connexion après inscription"
      );
      return;
    }

    // Redirection vers la page profil
    router.push("/profil");
  };

  return (
    <div className="w-full p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Inscription</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {signupFormFields.slice(0, 2).map((field) => (
              <div key={field.name} className="w-full sm:w-1/2">
                <label className="block text-sm font-medium text-blue-light mb-2">
                  {field.label} <span className="text-red-500">*</span>
                </label>
                <input
                  {...register(field.name)}
                  type={field.type}
                  placeholder={field.placeholder}
                  className="border border-blue-light/20 rounded-lg px-4 py-2 w-full focus:outline-none"
                />
                {errors[field.name] && (
                  <p className="text-red-500 text-sm">
                    {errors[field.name]?.message as string}
                  </p>
                )}
              </div>
            ))}
          </div>

          {signupFormFields.slice(2).map((field) => (
            <div key={field.name} className="w-full">
              <label className="block text-sm font-medium text-blue-light mb-2">
                {field.label} <span className="text-red-500">*</span>
              </label>
              <input
                {...register(field.name)}
                type={field.type}
                placeholder={field.placeholder}
                className="border border-blue-light/20 rounded-lg px-4 py-2 w-full focus:outline-none"
              />
              {errors[field.name] && (
                <p className="text-red-500 text-sm">
                  {errors[field.name]?.message as string}
                </p>
              )}
            </div>
          ))}
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <Button button type="submit" color="rose" disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader text="Connexion en cours..." />
          ) : (
            "S'inscrire"
          )}
        </Button>
      </form>
    </div>
  );
};

export default SignupForm;
