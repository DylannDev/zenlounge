import Image from "next/image";
import Button from "./Button";

const Hero = () => {
  return (
    <div className="">
      <div className="relative w-full h-[900px] lg:h-[800px]">
        <Image
          src={"/massage-1.jpg"}
          alt="bannière bijoux oshun jewelry"
          fill
          sizes="100%"
          className="object-cover object-bottom md:object-top brightness-95 rounded-3xl"
          priority
        />

        <div className="relative w-full h-full grid place-content-center">
          <div className="absolute bottom-0 flex flex-col justify-start gap-4 p-6 md:p-12 w-full lg:w-2/3 xl:w-1/2 text-brown">
            <h1 className="font-bold text-4xl md:text-5xl">
              Offrez-vous un moment de détente et bien-être
            </h1>
            <p className="font-medium text-lg">
              Massages, soins du corps et visage, et séjours détente en Guyane.
            </p>
            <div className="flex md:hidden">
              <Button color="rose" width="large">
                Réservez votre moment
              </Button>
            </div>
            <div className="hidden md:flex">
              <Button color="rose" width="normal">
                Réservez votre moment
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
