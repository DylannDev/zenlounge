"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { massageServices, soinsServices } from "@/data";
import { saveBooking } from "@/actions/saveBooking";
import { createManualClient } from "@/actions/createManualClient";
import { useToast } from "@/hooks/use-toast";
import DateSelector from "@/components/DateSelector";
import TimeSelector from "@/components/TimeSelector";
import Button from "@/components/Button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { PiCaretDown, PiCheck } from "react-icons/pi";
import { cn } from "@/lib/utils";

type SlotBooking = {
  dateIso: string;
  time: string;
  duration: number;
};

type SelectableClient = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
};

type Service = {
  slug: string;
  name: string;
  duration: number;
  price: number;
};

interface AdminBookingFormProps {
  slotBookings: SlotBooking[];
  clients: SelectableClient[];
}

const AdminBookingForm: React.FC<AdminBookingFormProps> = ({
  slotBookings,
  clients,
}) => {
  const router = useRouter();
  const { toast } = useToast();

  // ✅ Catalogue plat des prestations à l'unité (pas de forfaits ni location)
  const allServices: Service[] = useMemo(
    () => [
      ...massageServices,
      ...soinsServices.women,
      ...soinsServices.men,
    ],
    []
  );

  // ✅ Reconvertit les ISO strings en Date pour TimeSelector
  const bookingsForSlots = useMemo(
    () =>
      slotBookings.map((b) => ({
        date: new Date(b.dateIso),
        time: b.time,
        duration: b.duration,
      })),
    [slotBookings]
  );

  const [selectedSlug, setSelectedSlug] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [clientMode, setClientMode] = useState<"existing" | "new">(
    clients.length > 0 ? "existing" : "new"
  );
  const [selectedClientId, setSelectedClientId] = useState<string>("");
  const [clientPickerOpen, setClientPickerOpen] = useState(false);
  const [newClient, setNewClient] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const selectedService = allServices.find((s) => s.slug === selectedSlug);
  const selectedClient = clients.find((c) => c.id === selectedClientId);

  // ✅ Reset l'heure si la date ou la prestation change (les créneaux dispo changent)
  const handleSelectDate = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedTime("");
  };

  const handleSelectService = (slug: string) => {
    setSelectedSlug(slug);
    setSelectedTime("");
  };

  const validate = (): string | null => {
    if (!selectedService) return "Veuillez sélectionner une prestation.";
    if (!selectedDate) return "Veuillez sélectionner une date.";
    if (!selectedTime) return "Veuillez sélectionner un horaire.";

    if (clientMode === "existing") {
      if (!selectedClientId) return "Veuillez sélectionner un client.";
    } else {
      if (!newClient.firstName.trim()) return "Le prénom est requis.";
      if (!newClient.lastName.trim()) return "Le nom est requis.";
      if (!newClient.phone.trim()) return "Le téléphone est requis.";
    }
    return null;
  };

  const handleSubmit = async () => {
    const err = validate();
    if (err) {
      setErrorMessage(err);
      return;
    }
    setErrorMessage("");

    // ✅ Date normalisée à minuit local (cohérent avec le parseDate du
    // schéma serveur et avec la branche "crédit actif" du BookingForm public).
    // Passer un objet Date → Firestore sérialise en Timestamp natif.
    const normalizedDate = new Date(selectedDate!);
    normalizedDate.setHours(0, 0, 0, 0);

    setIsLoading(true);
    try {
      // 1️⃣ Résoudre le client : existant ou création/dé-dup
      let clientId: string;
      let clientName: string;
      let clientEmail: string;
      let clientPhone: string;

      if (clientMode === "existing") {
        const existing = clients.find((c) => c.id === selectedClientId);
        if (!existing) throw new Error("Client introuvable.");
        clientId = existing.id;
        clientName = existing.fullName;
        clientEmail = existing.email === "Non renseigné" ? "" : existing.email;
        clientPhone = existing.phone === "Non renseigné" ? "" : existing.phone;
      } else {
        const created = await createManualClient({
          firstName: newClient.firstName,
          lastName: newClient.lastName,
          phone: newClient.phone,
          email: newClient.email,
        });
        if (!created.success) {
          throw new Error(created.message);
        }
        clientId = created.clientId;
        clientName =
          `${newClient.firstName.trim()} ${newClient.lastName.trim()}`.trim();
        clientEmail = newClient.email.trim();
        clientPhone = newClient.phone.trim();
      }

      // 2️⃣ Enregistrer la réservation sous /clients/{clientId}/bookings
      const bookingData: BookingDataType = {
        serviceId: selectedService!.slug,
        serviceName: selectedService!.name,
        duration: selectedService!.duration,
        price: selectedService!.price,
        date: normalizedDate,
        time: selectedTime,
        clientName,
        clientEmail,
        clientPhone,
      };

      const response = await saveBooking(bookingData, clientId);

      if (!response?.success) {
        throw new Error(
          ("message" in response && response.message) ||
            "La réservation a échoué."
        );
      }

      // ✅ Reset des champs avant redirection
      setSelectedSlug("");
      setSelectedDate(undefined);
      setSelectedTime("");
      setSelectedClientId("");
      setNewClient({ firstName: "", lastName: "", email: "", phone: "" });

      toast({
        title: "Réservation enregistrée",
        description: "✅ La réservation a bien été créée.",
      });

      // ✅ On laisse au toast le temps de s'afficher avant la navigation,
      // et on garde isLoading=true pour empêcher tout double-clic. Le
      // composant est démonté par la redirection, pas besoin de reset.
      router.refresh();
      setTimeout(() => router.push("/admin/bookings"), 600);
    } catch (e) {
      console.error("Erreur création réservation manuelle :", e);
      setErrorMessage(
        e instanceof Error ? e.message : "Une erreur est survenue."
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 bg-white border border-rose-dark rounded-xl p-6 max-w-2xl">
      {/* 1. Prestation */}
      <div className="flex flex-col gap-2">
        <label className="block text-sm font-medium text-blue-light">
          Prestation
        </label>
        <Select value={selectedSlug} onValueChange={handleSelectService}>
          <SelectTrigger>
            <SelectValue placeholder="Choisir une prestation" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Massages</SelectLabel>
              {massageServices.map((s) => (
                <SelectItem key={s.slug} value={s.slug}>
                  {s.name} — {s.duration} min — {s.price}€
                </SelectItem>
              ))}
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>Soins femme</SelectLabel>
              {soinsServices.women.map((s) => (
                <SelectItem key={s.slug} value={s.slug}>
                  {s.name} — {s.duration} min — {s.price}€
                </SelectItem>
              ))}
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>Soins homme</SelectLabel>
              {soinsServices.men.map((s) => (
                <SelectItem key={s.slug} value={s.slug}>
                  {s.name} — {s.duration} min — {s.price}€
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* 2. Date + heure (réutilise les composants publics → mêmes règles
          d'horaires, pause midi et intervalle 30 min) */}
      {selectedService && (
        <div className="flex flex-col min-[500px]:flex-row gap-6">
          {/* ⚠️ DateSelector est contraint en largeur : la Calendar UI
              utilise des cellules flex avec des boutons de jour fixes
              (w-8), donc dans un parent trop large elle laisse un vide
              à droite. */}
          <div className="w-fit">
            <DateSelector
              selectedDate={selectedDate}
              onSelectDate={handleSelectDate}
            />
          </div>
          <div className="flex-1">
            <TimeSelector
              selectedDate={selectedDate}
              serviceDuration={selectedService.duration}
              selectedTime={selectedTime}
              onSelectTime={setSelectedTime}
              bookings={bookingsForSlots}
            />
          </div>
        </div>
      )}

      {/* 3. Client */}
      <div className="flex flex-col gap-3">
        <label className="block text-sm font-medium text-blue-light">
          Client
        </label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setClientMode("existing")}
            className={`px-3 py-2 text-sm rounded-md border ${
              clientMode === "existing"
                ? "border-orange bg-orange/10 text-orange"
                : "border-blue-light/20 bg-white text-blue-light"
            }`}
            disabled={clients.length === 0}
          >
            Client existant
          </button>
          <button
            type="button"
            onClick={() => setClientMode("new")}
            className={`px-3 py-2 text-sm rounded-md border ${
              clientMode === "new"
                ? "border-orange bg-orange/10 text-orange"
                : "border-blue-light/20 bg-white text-blue-light"
            }`}
          >
            Ajouter un client
          </button>
        </div>

        {clientMode === "existing" ? (
          <Popover
            open={clientPickerOpen}
            onOpenChange={setClientPickerOpen}
          >
            <PopoverTrigger asChild>
              <button
                type="button"
                role="combobox"
                aria-expanded={clientPickerOpen}
                className="flex w-full items-center justify-between gap-2 rounded-lg border border-blue-light/20 bg-white px-4 py-2 text-sm text-blue-light focus:outline-none focus:border-rose-dark"
              >
                <span
                  className={cn(
                    "truncate",
                    !selectedClientId && "text-blue-light/50"
                  )}
                >
                  {selectedClient
                    ? `${selectedClient.fullName}${
                        selectedClient.phone !== "Non renseigné"
                          ? ` — ${selectedClient.phone}`
                          : ""
                      }`
                    : "Rechercher un client"}
                </span>
                <PiCaretDown className="h-4 w-4 text-orange shrink-0" />
              </button>
            </PopoverTrigger>
            <PopoverContent
              className="p-0 w-[--radix-popover-trigger-width]"
              align="start"
            >
              <Command
                filter={(value, search) => {
                  // value est l'id du client; on cherche dans son fullName/phone
                  const c = clients.find((x) => x.id === value);
                  if (!c) return 0;
                  const haystack =
                    `${c.fullName} ${c.phone} ${c.email}`.toLowerCase();
                  return haystack.includes(search.toLowerCase()) ? 1 : 0;
                }}
              >
                <CommandInput placeholder="Rechercher par nom, téléphone..." />
                <CommandList>
                  <CommandEmpty>Aucun client trouvé.</CommandEmpty>
                  <CommandGroup>
                    {clients.map((c) => (
                      <CommandItem
                        key={c.id}
                        value={c.id}
                        onSelect={(value) => {
                          setSelectedClientId(value);
                          setClientPickerOpen(false);
                        }}
                      >
                        <PiCheck
                          className={cn(
                            "h-4 w-4 text-orange",
                            selectedClientId === c.id
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        <span className="flex-1 truncate">
                          {c.fullName}
                          {c.phone !== "Non renseigné" && (
                            <span className="text-blue-light/60">
                              {" "}
                              — {c.phone}
                            </span>
                          )}
                        </span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        ) : (
          <div className="flex flex-col gap-3">
            <p className="text-xs text-blue-light/70">
              Ce client sera enregistré dans la base après validation. Si un
              client avec le même téléphone existe déjà, il sera réutilisé.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Prénom *"
                value={newClient.firstName}
                onChange={(e) =>
                  setNewClient((c) => ({ ...c, firstName: e.target.value }))
                }
                className="border border-blue-light/20 rounded-lg px-4 py-2 w-full placeholder:text-sm focus:outline-none focus:border-rose-dark"
              />
              <input
                type="text"
                placeholder="Nom *"
                value={newClient.lastName}
                onChange={(e) =>
                  setNewClient((c) => ({ ...c, lastName: e.target.value }))
                }
                className="border border-blue-light/20 rounded-lg px-4 py-2 w-full placeholder:text-sm focus:outline-none focus:border-rose-dark"
              />
              <input
                type="tel"
                placeholder="Téléphone *"
                value={newClient.phone}
                onChange={(e) =>
                  setNewClient((c) => ({ ...c, phone: e.target.value }))
                }
                className="border border-blue-light/20 rounded-lg px-4 py-2 w-full placeholder:text-sm focus:outline-none focus:border-rose-dark"
              />
              <input
                type="email"
                placeholder="Email (optionnel)"
                value={newClient.email}
                onChange={(e) =>
                  setNewClient((c) => ({ ...c, email: e.target.value }))
                }
                className="border border-blue-light/20 rounded-lg px-4 py-2 w-full placeholder:text-sm focus:outline-none focus:border-rose-dark"
              />
            </div>
          </div>
        )}
      </div>

      {/* Erreur + soumission */}
      <div className="flex flex-col gap-3">
        {errorMessage && (
          <p className="text-red-500 text-sm" role="alert">
            {errorMessage}
          </p>
        )}
        <Button button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Enregistrement..." : "Enregistrer la réservation"}
        </Button>
      </div>
    </div>
  );
};

export default AdminBookingForm;
