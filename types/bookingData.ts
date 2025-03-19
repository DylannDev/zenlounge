type BookingDataType = {
  serviceId?: string;
  serviceName: string;
  duration?: number;
  price: number;
  date?: string | Date;
  time?: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  dateFrom?: string | Date;
  dateTo?: string | Date;
  extraServices?: ExtraService[];
  isForfait?: boolean;
  forfaitType?: "forfait-5" | "forfait-10";
};
