"use client";

import ProfileCreditCard from "./ProfileCreditCard";

const CreditServices: React.FC<CreditServicesProps> = ({ credits }) => {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold">Vos Crédits</h2>
      <ul className="space-y-4">
        {credits.map((credit) => (
          <ProfileCreditCard key={credit.id} credit={credit} />
        ))}
      </ul>
    </div>
  );
};

export default CreditServices;
