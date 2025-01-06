import Button from "@/components/Button";
import React from "react";

const SuccessPage = () => {
  return (
    <section className="max-w-[1200px] mx-auto text-center flex flex-col gap-4 justify-center py-60">
      <h1 className="text-4xl font-bold text-brown-dark">
        Réservation réussie !
      </h1>
      <p className="text-lg text-blue-light">
        La réservation a bien été prise en compte, vous recevrez un mail de
        confirmation.
      </p>
      <Button href="/">Retour à l'accueil</Button>
    </section>
  );
};

export default SuccessPage;
