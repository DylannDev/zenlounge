import StatusBadge from "@/components/admin/StatusBadge";
import { formatDate } from "@/lib/utils";

export const bookingTableColumns = [
  {
    key: "clientName",
    label: "Nom",
  },
  {
    key: "clientEmail",
    label: "Email",
  },
  {
    key: "serviceName",
    label: "Prestation",
  },
  {
    key: "date",
    label: "Date",
    format: (value: Date) => formatDate(value),
  },
  {
    key: "time",
    label: "Heure",
  },
  {
    key: "price",
    label: "Prix",
    format: (value: number) => `${value} €`,
  },
  {
    key: "duration",
    label: "Durée",
    format: (value: number) => `${value} min`,
  },
  {
    key: "status",
    label: "Statut",
    format: (value: string) => <StatusBadge status={value} />,
  },
];

export const clientTableColumns = [
  {
    key: "fullName",
    label: "Nom",
  },
  {
    key: "email",
    label: "Email",
  },
  {
    key: "phone",
    label: "Téléphone",
  },
  {
    key: "createdAt",
    label: "Créé le",
    format: (value: Date | null) =>
      value ? formatDate(value) : "Non renseigné",
  },
];

export const rentBookingTableColumns = [
  {
    key: "clientName",
    label: "Nom",
  },
  {
    key: "clientEmail",
    label: "Email",
  },
  {
    key: "clientPhone",
    label: "Téléphone",
  },
  {
    key: "dateFrom",
    label: "Arrivée",
    format: (value: Date) => formatDate(value),
  },
  {
    key: "dateTo",
    label: "Départ",
    format: (value: Date) => formatDate(value),
  },
  {
    key: "price",
    label: "Prix",
    format: (value: number) => `${value} €`,
  },
  {
    key: "extraServices",
    label: "Extras",
    format: (services: { name: string; quantity: number; price: number }[]) =>
      services?.length
        ? services.map((s) => `${s.name} x${s.quantity}`).join(", ")
        : "-",
  },
  {
    key: "status",
    label: "Statut",
    format: (value: string) => <StatusBadge status={value} />,
  },
];
