import Image from "next/image";
import Button from "./Button";

const Hero = () => {
  return (
    <div className="">
      <div className="relative w-full aspect-1/2 min-[500px]:aspect-2/3 sm:aspect-3/4 md:aspect-4/3 lg:aspect-video max-h-[calc(100dvh-70px)] sm:max-h-[calc(100dvh-120px)] overflow-hidden">
        <Image
          src={"/massage-1.jpg"}
          alt="massage photo"
          fill
          sizes="100vw"
          quality={100}
          className="object-cover object-bottom md:object-center brightness-95 rounded-3xl"
          priority
        />

        <div className="absolute bottom-0 w-full">
          <div className="flex flex-col justify-start gap-2 p-4 sm:p-6 xl:p-12 w-full lg:w-2/3 xl:w-1/2 text-brown-dark">
            <h1 className="font-bold text-5xl hidden sm:flex">
              Offrez-vous un moment de détente chez Zen Lounge
            </h1>
            <h1 className="font-bold text-3xl flex sm:hidden text-center">
              Offrez-vous un moment de détente
            </h1>
            <p className="font-medium text-sm sm:text-lg text-center sm:text-left">
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
