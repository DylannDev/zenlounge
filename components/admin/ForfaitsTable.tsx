import { forfaitTableColumns } from "@/data/DashboardTable.config";
import React from "react";

interface Forfait {
  id: string;
  clientName: string;
  email: string;
  phone: string;
  serviceName: string;
  remainingSessions: number;
  totalSessions: number;
  expiresAt: Date;
}

const ForfaitsTable = ({
  forfaits,
  title,
}: {
  forfaits: Forfait[];
  title: string;
}) => {
  return (
    <div className="overflow-x-auto bg-white mt-4 border border-rose-dark rounded-xl p-4">
      <h2 className="text-2xl mb-6">{title}</h2>
      <table className="w-full">
        <thead>
          <tr className="text-left bg-rose-light">
            {forfaitTableColumns.map((column, index) => (
              <th
                key={column.key}
                className={`p-4 text-sm font-semibold text-brown-dark ${
                  index === 0 ? "rounded-tl-lg rounded-bl-lg" : ""
                } ${index === forfaitTableColumns.length - 1 ? "rounded-tr-lg rounded-br-lg" : ""}`}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {forfaits.map((forfait) => (
            <tr key={forfait.id} className="text-[13.5px]">
              {forfaitTableColumns.map((column) => (
                <td key={column.key} className="p-4">
                  {column.format
                    ? column.format(
                        forfait[column.key as keyof Forfait],
                        forfait
                      )
                    : (forfait[column.key as keyof Forfait] as string | number)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ForfaitsTable;
