"use client";

import { credentialFormFields } from "@/data/ProfileForm.config";
import { credentialProfileSchema } from "@/validation/Profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Button from "../Button";
import Loader from "../Loader";

const CredentialProfileForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(credentialProfileSchema),
  });

  const onSubmit = async (data: any) => {
    console.log("Mot de passe modifié :", data);
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Changer votre mot de passe</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
        <div className="flex flex-col gap-4">
          {credentialFormFields.map((field) => (
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

          <Button
            button
            type="submit"
            color="rose"
            disabled={isSubmitting}
            responsiveWidth={{ default: "normal" }}
            compact
          >
            {isSubmitting ? (
              <Loader text="Modification en cours..." />
            ) : (
              "Modifier le mot de passe"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CredentialProfileForm;
