import Image from "next/image";
import Button from "./Button";

const Hero = () => {
  return (
    <div className="">
      <div className="relative w-full aspect-1/2 min-[500px]:aspect-2/3 sm:aspect-3/4 md:aspect-4/3 lg:aspect-video max-h-[calc(100dvh-140px)]">
        <Image
          src={"/massage-1.jpg"}
          alt="massage photo"
          fill
          sizes="100vw"
          quality={100}
          className="object-cover object-bottom md:object-center brightness-95 rounded-3xl"
          priority
        />

        <div className="relative w-full h-full grid place-content-center">
          <div className="absolute bottom-0 flex flex-col justify-start gap-4 p-6 md:p-12 w-full lg:w-2/3 xl:w-1/2 text-brown-dark">
            <h1 className="font-bold text-4xl md:text-5xl">
              Offrez-vous un moment de détente
            </h1>
            <p className="font-medium text-lg">
              Massages, soins du corps et visage, et séjours détente en Guyane.
            </p>
            <div className="flex md:hidden">
              <Button color="white" width="large">
                Réserver mon moment
              </Button>
            </div>
            <div className="hidden md:flex">
              <Button color="white" width="normal">
                Réserver mon moment
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
