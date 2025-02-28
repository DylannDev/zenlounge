import { clientTableColumns } from "@/data/DashboardTable.config";
import React from "react";

interface Client {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  createdAt: Date;
}

const ClientsTable = ({ clients }: { clients: Client[] }) => {
  return (
    <div className="overflow-x-auto bg-white mt-4 border border-rose-dark rounded-xl p-4">
      <h2 className="text-2xl mb-6">Liste des clients</h2>
      <table className="w-full">
        <thead>
          <tr className="text-left bg-rose-light">
            {clientTableColumns.map((column, index) => (
              <th
                key={column.key}
                className={`p-4 text-sm font-semibold text-brown-dark ${
                  (index === 0 && "rounded-tl-lg rounded-bl-lg") ||
                  (index === clientTableColumns.length - 1 &&
                    "rounded-tr-lg rounded-br-lg")
                }`}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id} className="text-sm">
              {clientTableColumns.map((column: any) => (
                <td key={column.key} className="p-4">
                  {column.format
                    ? column.format(client[column.key as keyof Client])
                    : (client[column.key as keyof Client] as string)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientsTable;
