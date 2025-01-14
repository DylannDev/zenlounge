import Image from "next/image";
import React from "react";
import Button from "./Button";

interface CategoryProps {
  title: string;
  description: string;
  imageUrl: string;
  keyInfo: { icon: string | React.ReactNode; text: string }[];
  reverse?: boolean; // Prop pour inverser l'ordre
}

const Category: React.FC<CategoryProps> = ({
  title,
  description,
  imageUrl,
  keyInfo,
  reverse = false,
}) => {
  return (
    <div
      className={`flex flex-col md:flex-row ${
        reverse ? "md:flex-row-reverse" : "md:flex-row"
      }`}
    >
      {/* Image Section */}
      <div className="relative aspect-square w-full md:w-1/2">
        <Image
          fill
          src={imageUrl}
          alt={`${title} photo`}
          className="object-cover rounded-3xl"
        />
      </div>

      {/* Text Section */}
      <div
        className={`w-full md:w-1/2 flex flex-col justify-between pt-6 ${
          reverse ? "md:pr-10" : "md:pl-10"
        }`}
      >
        {/* Title and Description */}
        <div>
          <h2 className="text-3xl font-medium">{title}</h2>
          <p className="font-medium text-blue-light mt-6">{description}</p>
        </div>

        {/* Key Information */}
        <div className="flex flex-col mt-5">
          {keyInfo.map((info, index) => (
            <div
              key={index}
              className="flex items-center gap-2 border-b border-gray-300 py-6 md:py-8"
            >
              <span className="text-2xl text-brown-dark">{info.icon}</span>
              <p className="text-blue-light font-medium">{info.text}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 pt-10">
          <Button color="rose">Découvrir</Button>
          <Button color="empty">Réserver</Button>
        </div>
      </div>
    </div>
  );
};

export default Category;
