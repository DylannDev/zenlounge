import BookingCard from "@/components/BookingCard";
import { ImageCarousel } from "@/components/ImageCarousel";
import SectionHeader from "@/components/SectionHeader";
import { roomData } from "@/data";
import { PiCheckCircleDuotone } from "react-icons/pi";

const Sejours = () => {
  return (
    <section className="max-w-[1400px] mx-auto flex flex-col pt-10 pb-20">
      {/* Section Header */}
      <SectionHeader
        title="Serenity Suite"
        subtitle={[
          "Profitez d'un séjour alliant détente, bien-être et confort, seul ou accompagné.",
        ]}
        bigTitle
      />
      <div className="flex flex-col min-[1200px]:flex-row gap-16 min-[1200px]:gap-10 h-full relative">
        {/* Main Content */}
        <div className="mt-16 min-[1200px]:my-16 w-full min-[1200px]:w-2/3 flex flex-col gap-16">
          <ImageCarousel />
          <div>
            <p className="mb-4">{roomData.description[0]}</p>
            <p>{roomData.description[1]}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {roomData.amenities.map((amenity, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-5 p-5 rounded-2xl border border-rose-dark"
              >
                <div className="flex justify-between w-full">
                  <h3 className="font-bold text-lg">{amenity.title}</h3>
                  <span className="text-3xl text-orange">{amenity.icon}</span>
                </div>
                <p className="text-sm text-blue-light">{amenity.description}</p>
              </div>
            ))}
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Règlement Intérieur</h2>
            <ul className="text-blue-light">
              {roomData.houseRules.map((rule, index) => (
                <li key={index} className="mb-2 flex gap-2 items-center">
                  <PiCheckCircleDuotone className="text-orange text-lg md:text-xl" />
                  <span className="text-sm md:text-base">{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* BookingCard Section */}
        <div className="w-full md:grid md:grid-cols-2 min-[1200px]:block min-[1200px]:w-1/3 min-[1200px]:mt-16">
          <div className="sticky top-[160px]">
            <BookingCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sejours;
