/* eslint-disable @next/next/no-img-element */
import { capitalizeFirstLetter, cn } from "@/lib/utils";
import { PiStarDuotone, PiStarFill, PiUser } from "react-icons/pi";
import React from "react";

export const ReviewCard = ({
  name,
  message,
  stars,
}: {
  name: string;
  message: string;
  stars: number;
}) => {
  const MAX_STARS = 5;

  return (
    <figure
      className={cn(
        "relative w-full sm:w-[400px] h-fit sm:h-full cursor-pointer overflow-hidden rounded-2xl py-8 px-6 transition duration-300",
        "bg-white border border-rose-dark flex flex-col gap-6"
      )}
    >
      <div className="flex flex-row items-center gap-4">
        <div className="rounded-full bg-orange ring-1 ring-orange ring-offset-4 flex items-center justify-center w-14 h-14">
          <PiUser className="text-3xl text-rose-background" />
        </div>
        <div className="flex flex-col gap-1">
          <figcaption className="text-lg font-bold capitalize">
            {name}
          </figcaption>
          <div className="flex items-center text-lg gap-1">
            {[...Array(MAX_STARS)].map((_, index) =>
              index < stars ? (
                <PiStarFill key={index} className="text-orange" />
              ) : (
                <PiStarDuotone key={index} className="text-orange" />
              )
            )}
          </div>
        </div>
      </div>

      <blockquote className="text-blue-light font-medium">
        {capitalizeFirstLetter(message)}
      </blockquote>
    </figure>
  );
};
