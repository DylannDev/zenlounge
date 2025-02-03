"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { InfosFormFields } from "@/data/ProfileForm.config";
import { infosProfileSchema } from "@/validation/Profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Button from "../Button";
import Loader from "../Loader";
import { UserData } from "@/types/userData";
import { updateUserProfile } from "@/actions/updateUserProfile";

type InfosFormInputs = {
  firstName: string;
  lastName: string;
  phone: string;
};

const InfosProfileForm = ({ userData }: { userData: UserData }) => {
  const router = useRouter();

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isFormModified, setIsFormModified] = useState(false);
  const [initialValues, setInitialValues] = useState<InfosFormInputs | null>(
    null
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<InfosFormInputs>({
    resolver: zodResolver(infosProfileSchema),
    defaultValues: {
      firstName: userData?.firstName || "",
      lastName: userData?.lastName || "",
      phone: userData?.phone || "",
    },
  });

  const onSubmit = async (data: any) => {
    setError(""); // Réinitialisation de l'erreur
    setSuccessMessage(""); // Réinitialisation du message de succès

    const response = await updateUserProfile(data);

    if (response.success) {
      setSuccessMessage("Vos informations ont été mises à jour.");
      setIsFormModified(false);
      setTimeout(() => {
        router.refresh();
        setSuccessMessage("");
      }, 3000);
    } else {
      setError(response.message || "Une erreur est survenue.");
    }
  };

  useEffect(() => {
    if (userData) {
      setInitialValues({
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone,
      });
    }
  }, [userData]);

  useEffect(() => {
    if (!initialValues) return;

    const hasChanged =
      initialValues.firstName !== watch("firstName") ||
      initialValues.lastName !== watch("lastName") ||
      initialValues.phone !== watch("phone");

    setIsFormModified(hasChanged);
  }, [watch("firstName"), watch("lastName"), watch("phone"), initialValues]);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Vos informations</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full"
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {InfosFormFields.slice(0, 2).map((field) => (
              <div key={field.name} className="w-full sm:w-1/2">
                <label className="block text-sm font-medium text-blue-light mb-2">
                  {field.label} <span className="text-red-500">*</span>
                </label>
                <input
                  {...register(field.name as keyof InfosFormInputs)}
                  type={field.type}
                  placeholder={field.placeholder}
                  className="border border-blue-light/20 rounded-lg px-4 py-2 w-full focus:outline-none"
                />
                {errors[field.name as keyof InfosFormInputs] && (
                  <p className="text-red-500 text-sm">
                    {errors[field.name as keyof InfosFormInputs]?.message}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            {InfosFormFields.slice(2).map((field) => (
              <div key={field.name} className="w-full">
                <label className="block text-sm font-medium text-blue-light mb-2">
                  {field.label} <span className="text-red-500">*</span>
                </label>
                <input
                  {...register(field.name as keyof InfosFormInputs)}
                  type={field.type}
                  placeholder={field.placeholder}
                  className="border border-blue-light/20 rounded-lg px-4 py-2 w-full focus:outline-none"
                />
                {errors[field.name as keyof InfosFormInputs] && (
                  <p className="text-red-500 text-sm">
                    {errors[field.name as keyof InfosFormInputs]?.message}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        <Button
          button
          type="submit"
          color="rose"
          disabled={isSubmitting || !isFormModified}
          responsiveWidth={{ default: "normal" }}
          compact
        >
          {isSubmitting ? (
            <Loader text="Modifications en cours..." />
          ) : (
            "Modifier les informations"
          )}
        </Button>
      </form>

      {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
      {successMessage && (
        <p className="text-green-500 text-sm font-medium">{successMessage}</p>
      )}
    </div>
  );
};

export default InfosProfileForm;
