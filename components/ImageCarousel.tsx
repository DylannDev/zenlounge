"use client";
import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { carouselImages } from "@/data";
import Autoplay from "embla-carousel-autoplay";

export function ImageCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 6000, stopOnInteraction: true })
  );
  return (
    <Carousel
      className="w-full"
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {carouselImages.map(({ img, alt }, index) => (
          <CarouselItem key={index}>
            <CardContent className="w-full aspect-square sm:aspect-4/3 max-h-[600px] relative">
              <Image
                fill
                src={img}
                alt={alt}
                className="object-cover rounded-3xl"
              />
            </CardContent>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
