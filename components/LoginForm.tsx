"use client";

import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/Button";
import { loginFormFields } from "@/data/LoginForm.config";
import { loginSchema } from "@/validation/Login";
import { signIn, signInAdmin, signInWithGoogle } from "@/actions/authClient";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { useRouter } from "next/navigation";
import Loader from "./Loader";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import SquareButton from "./SquareButton";

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
  const { toast } = useToast(); // ✅ Hook pour afficher le toast
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // ✅ État du Dialog
  const [resetEmail, setResetEmail] = useState(""); // ✅ Stocker l'email
  const [resetLoading, setResetLoading] = useState(false); // ✅ Loader pour la réinitialisation

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
        response = await signInAdmin(data.email, data.password);
      } else {
        response = await signIn(data.email, data.password);
      }

      if (response.success) {
        setError("");
        router.push(isAdminForm ? "/admin/bookings" : "/prestations");
        console.log(response.message);
      } else {
        setError(response.message || "Email ou mot de passe invalide.");
        console.log(response.message);
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

  // ✅ Gestion de la réinitialisation du mot de passe
  const handleResetPassword = async () => {
    if (!resetEmail) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer votre adresse email.",
      });
      return;
    }

    try {
      setResetLoading(true);
      await sendPasswordResetEmail(auth, resetEmail);
      toast({
        title: "Email envoyé",
        description:
          "Un email de réinitialisation a été envoyé. Vérifiez votre boîte de réception.",
      });
      setIsModalOpen(false); // ✅ Fermer le dialog après envoi
    } catch (error: any) {
      toast({
        title: "Erreur",
        description:
          "Impossible d'envoyer l'email de réinitialisation. Vérifiez votre adresse email.",
      });
      console.error(error);
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="w-full p-6">
      <h2 className="text-2xl font-bold text-center mb-6">
        {isAdminForm ? "Connexion Administrateur" : "Connexion"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
        {loginFormFields.map((field, index) => (
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

            {/* ✅ Ajout du lien sous le champ "Mot de passe" */}
            {index === 1 && (
              <div className="mt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)} // ✅ Ouvre le Dialog
                  className="text-sm font-semibold text-brown-dark hover:underline"
                >
                  Mot de passe oublié ?
                </button>
              </div>
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

      {!isAdminForm && (
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

      {/* ✅ Dialog pour la réinitialisation du mot de passe */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogTitle>Réinitialisation du mot de passe</DialogTitle>
          <DialogDescription>
            Entrez votre adresse email pour recevoir un lien de
            réinitialisation.
          </DialogDescription>

          <input
            type="email"
            placeholder="Votre email"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            className="border border-blue-light/20 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-rose-dark placeholder:text-sm"
          />

          <DialogFooter className="flex gap-2 sm:gap-1 justify-end mt-4">
            <SquareButton onClick={() => setIsModalOpen(false)} variant="white">
              Annuler
            </SquareButton>
            <SquareButton onClick={handleResetPassword} disabled={resetLoading}>
              {resetLoading
                ? "Envoi en cours..."
                : "Réinitialiser mon mot de passe"}
            </SquareButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LoginForm;
