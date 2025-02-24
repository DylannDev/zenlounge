import React from "react";
import "../globals.css";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="fr">
      <body className="bg-white">{children}</body>
    </html>
  );
};

export default layout;
