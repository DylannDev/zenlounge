import Button from "@/components/Button";
import React from "react";

const CancelPage = () => {
  return (
    <section className="max-w-[1200px] mx-auto text-center flex flex-col gap-4 justify-center py-60">
      <h1 className="text-4xl font-bold text-brown-dark">Paiement annulé !</h1>
      <p className="text-lg text-blue-light">
        Le paiement n'a pas abouti. Vous pouvez réessayer ou nous contacter si
        le problème persiste.
      </p>
      <div className="flex justify-center gap-4 mt-6">
        <Button width="normal" href="/">
          Retour à l'accueil
        </Button>
      </div>
    </section>
  );
};

export default CancelPage;
