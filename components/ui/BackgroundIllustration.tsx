import React from "react";
import Image from "next/image";

interface BackgroundIllustrationProps {
  src: string; // Chemin de l'illustration
  position?: string; // Classes Tailwind pour positionner l'élément
  opacity?: string; // Contrôle de l'opacité (ex : "opacity-60")
  maxWidth?: string; // Contrôle de la taille max (ex : "max-w-[250px]")
}

const BackgroundIllustration: React.FC<BackgroundIllustrationProps> = ({
  src,
  position = "top-0 left-0", // Position par défaut
  opacity = "opacity-60", // Opacité par défaut
  maxWidth = "max-w-[250px]", // Taille maximale par défaut
}) => {
  return (
    <div className={`absolute w-full ${maxWidth} ${opacity} ${position} -z-10`}>
      <div className={`relative w-full h-full aspect-square`}>
        <Image fill src={src} alt={src} className="object-cover" priority />
      </div>
    </div>
  );
};

export default BackgroundIllustration;
