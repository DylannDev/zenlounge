"use client";

import { InfosFormFields } from "@/data/ProfileForm.config";
import { infosProfileSchema } from "@/validation/Profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Button from "../Button";
import Loader from "../Loader";
import { UserData } from "@/types/userData";

type InfosFormInputs = {
  firstName: string;
  lastName: string;
  phone: string;
};

const InfosProfileForm = ({ userData }: { userData: UserData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InfosFormInputs>({
    resolver: zodResolver(infosProfileSchema),
    defaultValues: {
      firstName: userData?.firstName || "",
      lastName: userData?.lastName || "",
      phone: userData?.phone || "",
    },
  });

  const onSubmit = async (data: any) => {
    console.log("Données modifiées :", data);
  };

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
          disabled={isSubmitting}
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
    </div>
  );
};

export default InfosProfileForm;
