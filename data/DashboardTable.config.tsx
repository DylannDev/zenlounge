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
