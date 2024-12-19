"use client";

/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Marquee from "./ui/marquee";
import { ReviewCard } from "./ReviewCard";
import SectionHeader from "./SectionHeader";
import Button from "./Button";
// import { fetchReviews } from "@/firebase/fetchReviews";

type Review = {
  id: string;
  name: string;
  title: string;
  message: string;
  stars: number;
};

const ClientsReviews = () => {
  // const [reviews, setReviews] = useState<Review[]>([]);

  // useEffect(() => {
  //   const getReviews = async () => {
  //     const reviewsData = await fetchReviews();
  //     setReviews(reviewsData);
  //   };

  //   getReviews();
  // }, []);

  // Tableau temporaire des avis
  const reviews: Review[] = [
    {
      id: "1",
      name: "Sophie Dupont",
      title: "Une expérience incroyable",
      message:
        "Le massage relaxant était absolument merveilleux. Une vraie parenthèse de bien-être.",
      stars: 5,
    },
    {
      id: "2",
      name: "Jean Martin",
      title: "Professionnalisme au top",
      message:
        "Le massage suédois m'a aidé à détendre mes muscles après une semaine intense de sport.",
      stars: 4,
    },
    {
      id: "3",
      name: "Claire Bernard",
      title: "Une ambiance apaisante",
      message:
        "Le salon est magnifique et l'équipe est très attentionnée. J'y retournerai sans hésiter.",
      stars: 5,
    },
    {
      id: "4",
      name: "Pauline Girard",
      title: "Une détente totale",
      message:
        "Le massage aux pierres chaudes est à essayer absolument ! Je suis ressortie totalement détendue.",
      stars: 5,
    },
    {
      id: "5",
      name: "Olivier Rousseau",
      title: "Excellent rapport qualité-prix",
      message:
        "Un moment très agréable et des prix abordables. Je recommande sans réserve.",
      stars: 4,
    },
  ];

  return (
    <section
      className="relative rounded-3xl border border-rose-dark bg-rose-background py-10 sm:px-5 my-10"
      id="testimonials"
    >
      <div className="px-5 sm:px-0">
        <SectionHeader
          title="Avis Clients"
          subtitle={["Quelques témoignages de nos clients fidèles"]}
        />
      </div>
      <div className="px-5">
        <div className="relative hidden sm:flex w-full flex-col items-center justify-center overflow-hidden">
          <Marquee pauseOnHover className="[--duration:20s]">
            {reviews.map((review) => (
              <ReviewCard
                key={review.id}
                name={review.name}
                title={review.title}
                message={review.message}
                stars={review.stars}
              />
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-rose-background to-rose-background/0"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-rose-background to-rose-background/0"></div>
        </div>
      </div>
      <div className="relative flex sm:hidden h-[600px] w-full flex-col items-center justify-center overflow-hidden">
        <Marquee pauseOnHover vertical className="[--duration:20s]">
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              name={review.name}
              title={review.title}
              message={review.message}
              stars={review.stars}
            />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/5 bg-gradient-to-t from-rose-background to-rose-background/0"></div>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/5 bg-gradient-to-b from-rose-background to-rose-background/0"></div>
      </div>
      <div className="pt-10 flex justify-center w-full">
        <Button color="empty" width="normal">
          Laisser un commentaire
        </Button>
      </div>
    </section>
  );
};

export default ClientsReviews;
