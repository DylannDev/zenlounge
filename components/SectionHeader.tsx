import React from "react";

interface SectionHeaderProps {
  title: string;
  subtitle: string[];
  className?: string;
  bigTitle?: boolean;
  textCenter?: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  className = "",
  bigTitle = false,
  textCenter = false,
}) => {
  return (
    <div
      className={`mb-1 flex flex-col ${className} ${
        bigTitle ? "gap-8" : "gap-2"
      } ${textCenter && "text-center"}`}
    >
      <h1
        className={`font-bold ${
          bigTitle
            ? "text-3xl md:text-5xl"
            : "text-base text-brown-dark tracking-wider uppercase"
        }`}
      >
        {title}
      </h1>
      <h2 className="text-xl md:text-4xl font-medium text-brown-background">
        {subtitle.map((line, index) => (
          <span key={index}>
            {line}
            {index < subtitle.length - 1 && <br />}
          </span>
        ))}
      </h2>
    </div>
  );
};

export default SectionHeader;
