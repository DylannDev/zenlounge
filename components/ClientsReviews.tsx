"use client";

/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Marquee from "./ui/marquee";
import { ReviewCard } from "./ReviewCard";
import SectionHeader from "./SectionHeader";
import Button from "./Button";
import { fetchReviews } from "@/actions/fetchReviews";

type Review = {
  id: string;
  name: string;
  message: string;
  stars: number;
};

const ClientsReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const getReviews = async () => {
      const reviewsData = await fetchReviews();
      setReviews(reviewsData);
    };

    getReviews();
  }, []);

  return (
    <section
      className="relative rounded-3xl border border-rose-dark bg-rose-background py-10 sm:px-5 my-10"
      id="testimonials"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="px-5 sm:px-0 mb-16">
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
                message={review.message}
                stars={review.stars}
              />
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/5 bg-gradient-to-t from-rose-background to-rose-background/0"></div>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1/5 bg-gradient-to-b from-rose-background to-rose-background/0"></div>
        </div>
        <div className="pt-10 flex justify-center w-full">
          <Button
            responsiveWidth={{ default: "normal" }}
            href="/reviews"
            color="empty"
          >
            Laisser un commentaire
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ClientsReviews;
