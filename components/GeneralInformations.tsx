import { profileInformations } from "@/data";
import { PiCheckCircleDuotone } from "react-icons/pi";

const GeneralInformations = ({
  isBookingSimple = false,
}: {
  isBookingSimple?: boolean;
}) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Informations générales</h2>
      <ul className="text-blue-light list-none flex flex-col gap-2">
        {profileInformations.map((info, index) =>
          isBookingSimple ? (
            index > 0 && (
              <li
                key={info.id}
                className="mb-2 flex gap-2 items-start sm:items-center"
              >
                <span>
                  <PiCheckCircleDuotone className="text-orange text-lg md:text-xl" />
                </span>
                <span className="text-[13px] md:text-[14.5px]">
                  {info.text}
                </span>
              </li>
            )
          ) : (
            <li
              key={info.id}
              className="mb-2 flex gap-2 items-start sm:items-center"
            >
              <span>
                <PiCheckCircleDuotone className="text-orange text-lg md:text-xl" />
              </span>
              <span className="text-[13px] md:text-[14.5px]">{info.text}</span>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default GeneralInformations;
