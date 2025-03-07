import { rentBookingTableColumns } from "@/data/DashboardTable.config";
import React from "react";

const RentBookingsTable = ({
  bookings,
  isPastbookings,
}: {
  bookings: RentBookingData[];
  isPastbookings?: boolean;
}) => {
  return (
    <div className="overflow-x-auto bg-white mt-4 border border-rose-dark rounded-xl p-4">
      <h2 className="text-2xl mb-6">
        {isPastbookings ? "Historique Locations" : "Prochaines Locations"}
      </h2>
      <table className="w-full">
        <thead>
          <tr className="text-left bg-rose-light">
            {rentBookingTableColumns.map((column, index) => (
              <th
                key={column.key}
                className={`p-4 text-sm font-semibold text-brown-dark ${
                  index === 0 ? "rounded-tl-lg rounded-bl-lg" : ""
                } ${
                  index === rentBookingTableColumns.length - 1
                    ? "rounded-tr-lg rounded-br-lg"
                    : ""
                }`}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id} className="text-[13.5px]">
              {rentBookingTableColumns.map((column: any) => (
                <td key={column.key} className="p-4">
                  {column.format
                    ? column.format(
                        booking[column.key as keyof RentBookingData]
                      )
                    : (booking[column.key as keyof RentBookingData] as
                        | string
                        | number)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RentBookingsTable;
