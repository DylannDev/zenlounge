import { bookingTableColumns } from "@/data/DashboardTable.config";
import React from "react";

interface Booking {
  id: string;
  clientName: string;
  clientEmail: string;
  serviceName: string;
  date: Date;
  time: string;
  price: number;
  duration: number;
  status: string;
}

const BookingsTable = ({
  bookings,
  isPastbookings,
}: {
  bookings: Booking[];
  isPastbookings?: boolean;
}) => {
  return (
    <div className="overflow-x-auto bg-white mt-4 border border-rose-dark rounded-xl p-4">
      <h2 className="text-2xl mb-6">
        {isPastbookings ? "Historique Rendez-vous" : "Prochains Rendez-vous"}
      </h2>
      <table className="w-full">
        <thead>
          <tr className="text-left bg-rose-light">
            {bookingTableColumns.map((column, index) => (
              <th
                key={column.key}
                className={`p-4 text-sm font-semibold text-brown-dark ${(index === 0 && "rounded-tl-lg rounded-bl-lg") || (index === bookingTableColumns.length - 1 && "rounded-tr-lg rounded-br-lg")}`}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id} className="text-[13.5px]">
              {bookingTableColumns.map((column: any) => (
                <td key={column.key} className="p-4">
                  {column.format
                    ? column.format(booking[column.key as keyof Booking])
                    : (booking[column.key as keyof Booking] as string | number)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingsTable;
