"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PiStarDuotone, PiStarFill } from "react-icons/pi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { reviewsInputsConfig } from "@/data/Reviews.config";
import Button from "@/components/Button";
import SectionHeader from "@/components/SectionHeader";
import { submitReview } from "@/actions/submitReview";
import { reviewSchemaClient } from "@/validation/reviewSchemaClient";

type ReviewFormData = z.infer<typeof reviewSchemaClient>;

const Reviews = () => {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);

  // ✅ Initialisation de React Hook Form avec validation Zod
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchemaClient),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      stars: 0,
    },
  });

  // ✅ Gestion des étoiles (sélection de note)
  const handleStarChange = (stars: number) => {
    setValue("stars", stars);
  };

  // ✅ Soumission du formulaire
  const onSubmit = async (formData: ReviewFormData) => {
    try {
      await submitReview(formData);
      setSubmitted(true);
    } catch (error) {
      console.error("Erreur lors de la soumission de l'avis :", error);
    }
  };

  // ✅ Redirection après soumission
  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        router.push("/");
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [submitted, router]);

  return (
    <div className="h-full w-full my-20 min-h-[634px] flex flex-col justify-center">
      {!submitted ? (
        <div className="flex flex-col gap-12">
          <SectionHeader
            title="Avis Clients"
            subtitle={["Partagez votre expérience"]}
            textCenter
          />

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-[700px] mx-auto py-8 px-6 rounded-3xl space-y-4 border border-rose-dark"
          >
            <div className="flex flex-col gap-4 mb-10">
              {reviewsInputsConfig.map((input, index) =>
                input.type === "textarea" ? (
                  <textarea
                    key={index}
                    {...register(input.name as keyof ReviewFormData)} // ✅ Correction du type ici
                    placeholder={input.placeholder}
                    rows={input.rows}
                    className="border border-blue-light/20 rounded-lg px-3 py-2 w-full placeholder-gray-400 placeholder:text-sm focus:outline-none focus:border-rose-dark"
                  />
                ) : (
                  <input
                    key={index}
                    type={input.type}
                    {...register(input.name as keyof ReviewFormData)} // ✅ Correction du type ici
                    placeholder={input.placeholder}
                    className="border border-blue-light/20 rounded-lg px-3 py-2 w-full placeholder-gray-400 placeholder:text-sm focus:outline-none focus:border-rose-dark"
                  />
                )
              )}
              {/* Affichage des erreurs */}
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
              {errors.message && (
                <p className="text-red-500 text-sm">{errors.message.message}</p>
              )}

              {/* Sélection des étoiles */}
              <div className="flex flex-col justify-center items-center gap-2">
                <span className="text-base">Notez votre expérience :</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div key={star} onClick={() => handleStarChange(star)}>
                      {watch("stars") >= star ? (
                        <PiStarFill className="cursor-pointer text-xl text-orange" />
                      ) : (
                        <PiStarDuotone className="cursor-pointer text-xl text-orange" />
                      )}
                    </div>
                  ))}
                </div>
                {errors.stars && (
                  <p className="text-red-500 text-sm">{errors.stars.message}</p>
                )}
              </div>
            </div>
            <div className="flex justify-center">
              <Button button type="submit">
                Soumettre mon avis
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <div className="flex flex-col gap-8 items-center relative h-full">
          <IoMdCheckmarkCircleOutline className="text-7xl text-brown-dark" />
          <div>
            <p className="text-center text-3xl text-rose-dark font-semibold mb-4">
              Merci pour votre avis !
            </p>
            <p className="text-blue-light">
              Vous serez redirigé vers la page d'accueil dans quelques secondes.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews;
