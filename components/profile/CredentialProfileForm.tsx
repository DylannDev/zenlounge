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
import { signInWithEmailAndPassword } from "firebase/auth";
import { getAuthErrorMessage } from "@/lib/authErrors";

type CredentialFormInputs = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const CredentialProfileForm = () => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const userEmail = auth.currentUser?.email!;

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
      // ✅ Étape 1 : Vérifier le mot de passe actuel côté client
      const userCredential = await signInWithEmailAndPassword(
        auth,
        userEmail,
        data.currentPassword
      );

      if (!userCredential.user) {
        setError("Mot de passe actuel incorrect.");
        return;
      }

      // ✅ Étape 2 : Envoyer la requête au serveur pour changer le mot de passe
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
          router.refresh(); // ✅ Rafraîchir la page pour afficher les nouvelles données
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
            {credentialFormFields.map((field) => (
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
    </div>
  );
};

export default CredentialProfileForm;
