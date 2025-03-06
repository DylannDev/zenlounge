import { PiCalendar, PiWarning } from "react-icons/pi";
import SquareButton from "./SquareButton";
import RangeDateSelector from "./RangeDateSelector";
import { format, isWithinInterval } from "date-fns";
import { DateRange } from "react-day-picker";
import { fr } from "date-fns/locale";
import { useEffect, useRef, useState } from "react";
import Loader from "./Loader";
import { fetchRentBookings } from "@/actions/fetchRentBookings";

export const DateSelection = ({
  selectedDate,
  setSelectedDate,
  showCalendar,
  setShowCalendar,
  roomPricePerNight,
  setIsBookingValid, // Ajout du setter pour valider ou non la réservation
}: {
  selectedDate: DateRange | undefined;
  setSelectedDate: (range: DateRange | undefined) => void;
  showCalendar: boolean;
  setShowCalendar: (state: boolean) => void;
  roomPricePerNight: number;
  setIsBookingValid: (valid: boolean) => void;
}) => {
  const [isSelectingRange, setIsSelectingRange] = useState(false);
  const [bookedDates, setBookedDates] = useState<{ from: Date; to: Date }[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [overlappingBooking, setOverlappingBooking] = useState(false); // ✅ État pour signaler un chevauchement
  const calendarRef = useRef<HTMLDivElement>(null);

  // 📌 Charger les dates réservées au montage
  useEffect(() => {
    const loadBookedDates = async () => {
      try {
        const dates = await fetchRentBookings();
        setBookedDates(dates);
      } catch (error) {
        console.error("🚨 Erreur lors de la récupération des dates :", error);
      } finally {
        setLoading(false);
      }
    };

    loadBookedDates();
  }, []);

  // ✅ Vérifie si la plage sélectionnée chevauche une réservation existante
  const isOverlappingWithBooking = (from: Date, to: Date) => {
    return bookedDates.some((booking) => {
      return (
        (from <= booking.to && to >= booking.from) || // ⚠️ Chevauchement partiel ou total
        (from >= booking.from && from <= booking.to) || // Début à l'intérieur d'une réservation
        (to >= booking.from && to <= booking.to) || // Fin à l'intérieur d'une réservation
        (from <= booking.from && to >= booking.to) // Englobe totalement une réservation
      );
    });
  };

  const formatDateWithDay = (date: Date) =>
    format(date, "EEE. dd MMM", { locale: fr }).replace(".", "");

  const formatDateRange = () =>
    selectedDate?.from && selectedDate?.to
      ? `${formatDateWithDay(selectedDate.from)} – ${formatDateWithDay(selectedDate.to)}`
      : "Arrivée — Départ";

  // ✅ Fermer le calendrier lorsqu'on clique en dehors (hors flèches de navigation)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node) &&
        showCalendar
      ) {
        setShowCalendar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCalendar]);

  // ✅ Gestion de la sélection des dates
  const handleSelectDate = (range: DateRange | undefined) => {
    if (!range) return;

    const { from, to } = range;

    // ✅ Cas 1 : L'utilisateur clique à nouveau sur la même date => Désélectionner
    if (from && to && from.getTime() === to.getTime()) {
      setSelectedDate(undefined);
      setIsSelectingRange(false);
      return;
    }

    // ✅ Cas 2 : Sélection d'une nouvelle plage complète (vérification chevauchement)
    if (from && to) {
      const isOverlapping = isOverlappingWithBooking(from, to);
      setOverlappingBooking(isOverlapping);
      setIsBookingValid(!isOverlapping);

      if (!isOverlapping) {
        setSelectedDate({ from, to });
        setIsSelectingRange(false);
        setShowCalendar(false);
      } else {
        setShowCalendar(false);
        setSelectedDate(undefined);
      }
      return;
    }

    // ✅ Cas 3 : Sélection d'une date d'arrivée seule (on attend la date de départ)
    if (from && !to) {
      setSelectedDate({ from, to: undefined });
      setIsSelectingRange(true);
    }
  };

  return (
    <div className="relative flex flex-col gap-2 border-t border-b py-5">
      <div className="flex items-center justify-between">
        <p className="font-semibold">Prix par nuit :</p>
        <span className="font-bold text-lg">{roomPricePerNight}€</span>
      </div>
      <div className="flex flex-col sm:flex-row items-left sm:items-center gap-2 justify-between">
        <p className="font-semibold text-left">Dates :</p>
        <SquareButton
          icon={<PiCalendar />}
          variant="white"
          onClick={() => setShowCalendar(!showCalendar)}
        >
          {formatDateRange()}
        </SquareButton>
      </div>

      {overlappingBooking && (
        <p className="text-red-500 text-sm mt-2 flex items-center gap-1 justify-center">
          <PiWarning className="text-lg" />
          Ces dates sont indisponibles.
        </p>
      )}

      {showCalendar && (
        <div
          ref={calendarRef}
          className="absolute top-32 sm:top-24 right-0 z-10 mt-2"
        >
          {loading ? (
            <div className="bg-white rounded-lg p-3 border border-rose-dark">
              <Loader text="Chargement..." />
            </div>
          ) : (
            <RangeDateSelector
              selectedDate={selectedDate}
              onSelectDate={handleSelectDate}
              bookedDates={bookedDates}
            />
          )}
        </div>
      )}
    </div>
  );
};
