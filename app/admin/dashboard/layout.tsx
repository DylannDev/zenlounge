import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="bg-gray-100 min-h-screen w-full flex">
      {/* ✅ Sidebar fixe à gauche */}
      <p>Sidebar</p>
      {/* ✅ Contenu principal */}
      <div className="flex-grow p-6">{children}</div>
    </main>
  );
};

export default layout;
