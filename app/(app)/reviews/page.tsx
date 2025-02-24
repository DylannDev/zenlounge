"use client";

import React, { useEffect, useState } from "react";
import { PiStarDuotone, PiStarFill } from "react-icons/pi";
import { useRouter } from "next/navigation";
import { reviewsInputsConfig } from "@/data/Reviews.config";
import Button from "@/components/Button";
import SectionHeader from "@/components/SectionHeader";
import { submitReview } from "@/actions/submitReview";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const INITIAL_FORM_DATA = {
  name: "",
  email: "",
  message: "",
  stars: 0,
};

const Reviews = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStarChange = (stars: number) => {
    setFormData((prev) => ({
      ...prev,
      stars,
    }));
    if (error) setError(""); // Réinitialise l'erreur si une étoile est sélectionnée
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setError("Veuillez remplir tous les champs avant de continuer.");
      return;
    }

    if (formData.stars === 0) {
      setError("Veuillez sélectionner au moins 1 étoile.");
      return;
    }

    try {
      await submitReview(formData);
      setSubmitted(true);
      setFormData(INITIAL_FORM_DATA);
    } catch (err: any) {
      console.error(err.message);
      setError("Erreur lors de la soumission de l'avis.");
    }
  };

  // Redirection après 5 secondes une fois le formulaire soumis
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
            onSubmit={handleSubmit}
            className="w-full max-w-[700px] mx-auto py-8 px-6 rounded-3xl space-y-4 border border-rose-dark"
          >
            <div className="flex flex-col gap-4 mb-10">
              {reviewsInputsConfig.map((input, index) =>
                input.type === "textarea" ? (
                  <textarea
                    key={index}
                    name={input.name}
                    value={formData[input.name as keyof typeof formData]}
                    onChange={handleChange}
                    placeholder={input.placeholder}
                    rows={input.rows}
                    className="border border-blue-light/20 rounded-lg px-3 py-2 w-full placeholder-gray-400 placeholder:text-sm focus:outline-none focus:border-rose-dark"
                  />
                ) : (
                  <input
                    key={index}
                    type={input.type}
                    name={input.name}
                    value={formData[input.name as keyof typeof formData]}
                    onChange={handleChange}
                    placeholder={input.placeholder}
                    className="border border-blue-light/20 rounded-lg px-3 py-2 w-full placeholder-gray-400 placeholder:text-sm focus:outline-none focus:border-rose-dark"
                  />
                )
              )}
              <div className="flex flex-col justify-center items-center gap-2">
                <span className="text-base">Notez votre expérience :</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div key={star} onClick={() => handleStarChange(star)}>
                      {formData.stars >= star ? (
                        <PiStarFill className="cursor-pointer text-xl text-orange" />
                      ) : (
                        <PiStarDuotone className="cursor-pointer text-xl text-orange" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {error && (
              <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
            )}
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
