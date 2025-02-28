import { fetchClients } from "@/actions/fetchClients";
import ClientsTable from "@/components/admin/ClientsTable";

const ClientsPage = async () => {
  const clients = await fetchClients();

  return (
    <section className="w-full">
      {clients.length === 0 ? (
        <p className="text-gray-500 mt-4">Aucun client enregistré.</p>
      ) : (
        <ClientsTable clients={clients} />
      )}
    </section>
  );
};

export default ClientsPage;
