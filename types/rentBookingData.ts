interface RentBookingData {
  id?: string;
  serviceName: string;
  dateFrom: Date | string;
  dateTo: Date | string;
  price: number;
  clientName?: string;
  clientEmail?: string;
  clientPhone?: string;
  extraServices: { name: string; quantity: number; price: number }[];
  status?: string;
  userId?: string;
}
