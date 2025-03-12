"use client";

import { useState } from "react";
import { credentialFormFields } from "@/data/ProfileForm.config";
import { credentialProfileSchema } from "@/validation/Profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Button from "../Button";
import Loader from "../Loader";
import { updateUserPassword } from "@/actions/updateUserPassword";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase/firebase";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getAuthErrorMessage } from "@/lib/authErrors";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import SquareButton from "../SquareButton";

type CredentialFormInputs = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const CredentialProfileForm = () => {
  const router = useRouter();
  const { toast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const userEmail = auth.currentUser?.email!;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState(userEmail || "");
  const [resetLoading, setResetLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CredentialFormInputs>({
    resolver: zodResolver(credentialProfileSchema),
    defaultValues: {
      currentPassword: "*******",
      newPassword: "*******",
      confirmPassword: "*******",
    },
  });

  const handleEditClick = () => {
    setIsEditing(true);
    reset({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const onSubmit = async (data: CredentialFormInputs) => {
    setError("");
    setSuccessMessage("");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        userEmail,
        data.currentPassword
      );

      if (!userCredential.user) {
        setError("Mot de passe actuel incorrect.");
        return;
      }

      const response = await updateUserPassword(data.newPassword);

      if (response.success) {
        setSuccessMessage("Votre mot de passe a été mis à jour.");
        setIsEditing(false);
        reset({
          currentPassword: "*******",
          newPassword: "*******",
          confirmPassword: "*******",
        });
        setTimeout(() => {
          router.refresh();
          setSuccessMessage("");
        }, 3000);
      } else {
        setError(response.message || "Une erreur est survenue.");
      }
    } catch (error: any) {
      if (error.code === "auth/invalid-credential") {
        setError("Mot de passe actuel incorrect.");
      } else {
        setError(getAuthErrorMessage(error.code));
      }
    }
  };

  // ✅ Fonction de réinitialisation du mot de passe
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
      setIsModalOpen(false);
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
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Changer votre mot de passe</h2>

      {!isEditing ? (
        <div className="flex flex-col gap-4">
          <form>
            <label className="block text-sm font-medium text-blue-light mb-2">
              Mot de passe <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              value="**********"
              readOnly
              className="border border-blue-light/20 rounded-lg px-4 py-2 w-full focus:outline-none bg-gray-100 cursor-not-allowed"
            />
          </form>

          <Button
            button
            onClick={handleEditClick}
            color="rose"
            responsiveWidth={{ default: "normal" }}
            compact
          >
            Modifier le mot de passe
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
          <div className="flex flex-col gap-4">
            {credentialFormFields.map((field, index) => (
              <div key={field.name} className="w-full">
                <label className="block text-sm font-medium text-blue-light mb-2">
                  {field.label} <span className="text-red-500">*</span>
                </label>
                <input
                  {...register(field.name as keyof CredentialFormInputs)}
                  type={field.type}
                  placeholder={field.placeholder}
                  className="border border-blue-light/20 rounded-lg px-4 py-2 w-full focus:outline-none"
                />
                {errors[field.name as keyof CredentialFormInputs] && (
                  <p className="text-red-500 text-sm">
                    {errors[field.name as keyof CredentialFormInputs]?.message}
                  </p>
                )}

                {/* ✅ Ajouter le lien "Mot de passe oublié ?" sous le premier champ */}
                {index === 0 && (
                  <div className="mt-1">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(true)}
                      className="hover:underline text-sm text-brown-dark font-semibold"
                    >
                      Mot de passe oublié ?
                    </button>
                  </div>
                )}
              </div>
            ))}

            <div className="flex gap-2">
              <Button
                button
                type="submit"
                color="rose"
                disabled={isSubmitting}
                responsiveWidth={{ default: "normal" }}
                compact
              >
                {isSubmitting ? (
                  <Loader text="Changement de mot de passe..." />
                ) : (
                  "Confirmer"
                )}
              </Button>
              <Button
                button
                onClick={() => setIsEditing(false)}
                color="empty"
                disabled={isSubmitting}
                responsiveWidth={{ default: "normal" }}
                compact
              >
                Annuler
              </Button>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {successMessage && (
              <p className="text-green-500 text-sm">{successMessage}</p>
            )}
          </div>
        </form>
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
            className="border border-blue-light/20 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-rose-dark"
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

export default CredentialProfileForm;
