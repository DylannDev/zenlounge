type BookingDataType = {
  serviceId?: string;
  serviceName: string;
  duration?: number;
  price: number;
  date?: Date;
  time?: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  dateFrom?: Date;
  dateTo?: Date;
  extraServices?: ExtraService[];
  isForfait?: boolean;
  forfaitType?: "forfait-5" | "forfait-10";
};
