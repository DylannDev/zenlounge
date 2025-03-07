"use client";

import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/Button";
import { loginFormFields } from "@/data/LoginForm.config";
import { loginSchema } from "@/validation/Login";
import { signIn, signInAdmin, signInWithGoogle } from "@/actions/authClient";
import { useRouter } from "next/navigation";
import Loader from "./Loader";

type LoginFormInputs = {
  email: string;
  password: string;
};

const LoginForm = ({
  setLoading,
  isAdminForm = false,
}: {
  setLoading: (value: boolean) => void;
  isAdminForm?: boolean;
}) => {
  const router = useRouter();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      let response;

      if (isAdminForm) {
        response = await signInAdmin(data.email, data.password); // ✅ Connexion admin
      } else {
        response = await signIn(data.email, data.password); // ✅ Connexion utilisateur normal
      }

      if (response.success) {
        setError("");
        router.push(isAdminForm ? "/admin/bookings" : "/prestations"); // ✅ Redirection adaptée
      } else {
        setError(response.message || "Email ou mot de passe invalide.");
      }
    } catch (err) {
      setError("Une erreur est survenue lors de la connexion");
      console.error(err);
    }
  };

  const handleGoogleSignIn = async () => {
    if (isAdminForm) return;

    try {
      setError("");
      await signInWithGoogle();
      setLoading(true);
      router.push("/prestations");
    } catch (err) {
      setError("Une erreur est survenue avec la connexion Google");
      setLoading(false);
      console.error(err);
    }
  };

  return (
    <div className="w-full p-6">
      <h2 className="text-2xl font-bold text-center mb-6">
        {isAdminForm ? "Connexion Administrateur" : "Connexion"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
        {loginFormFields.map((field) => (
          <div key={field.id}>
            <label className="block text-sm font-medium text-blue-light mb-2">
              {field.label} <span className="text-red-500">*</span>
            </label>
            <input
              {...register(field.name as keyof LoginFormInputs)}
              type={field.type}
              placeholder={field.placeholder}
              className="border border-blue-light/20 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-rose-dark"
            />
            {errors[field.name as keyof LoginFormInputs] && (
              <p className="text-red-500 text-sm">
                {errors[field.name as keyof LoginFormInputs]?.message as string}
              </p>
            )}
          </div>
        ))}

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <Button button type="submit" color="rose" disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader text="Connexion en cours..." />
          ) : (
            "Se connecter"
          )}
        </Button>
      </form>

      {!isAdminForm && ( // ✅ Désactiver Google Sign-in pour les admins
        <>
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-3 text-gray-500 text-sm">ou</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <Button
            button
            onClick={handleGoogleSignIn}
            color="empty"
            disabled={isSubmitting}
          >
            Connexion avec Google
          </Button>
        </>
      )}
    </div>
  );
};

export default LoginForm;
