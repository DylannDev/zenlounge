import React from "react";

interface SectionHeaderProps {
  title: string;
  subtitle: string[];
  className?: string;
  bigTitle?: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  className = "",
  bigTitle = false,
}) => {
  return (
    <div
      className={`mb-8 flex flex-col ${className} ${
        bigTitle ? "gap-8" : "gap-2"
      }`}
    >
      <h2
        className={`font-bold ${
          bigTitle ? "text-4xl md:text-6xl" : "text-lg text-brown-dark"
        }`}
      >
        {title}
      </h2>
      <p className="text-2xl md:text-4xl font-medium text-brown-background">
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
