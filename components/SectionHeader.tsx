import React from "react";

interface SectionHeaderProps {
  title: string;
  subtitle: string[];
  className?: string;
  bigTitle?: boolean;
  textCenter?: boolean;
  /**
   * Niveau sémantique du titre. Par défaut `h2`.
   * Mettre `h1` UNIQUEMENT sur le premier SectionHeader d'une page,
   * pour ne jamais avoir plus d'un H1.
   */
  as?: "h1" | "h2" | "h3";
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  className = "",
  bigTitle = false,
  textCenter = false,
  as = "h2",
}) => {
  const TitleTag = as;

  return (
    <div
      className={`mb-1 flex flex-col ${className} ${
        bigTitle ? "gap-8" : "gap-2"
      } ${textCenter && "text-center"}`}
    >
      <TitleTag
        className={`font-bold ${
          bigTitle
            ? "text-3xl md:text-5xl"
            : "text-base text-brown-dark tracking-wider uppercase"
        }`}
      >
        {title}
      </TitleTag>
      <p className="text-xl md:text-4xl font-medium text-brown-background">
        {subtitle.map((line, index) => (
          <span key={index}>
            {line}
            {index < subtitle.length - 1 && <br />}
          </span>
        ))}
      </p>
    </div>
  );
};

export default SectionHeader;
