import { fetchForfaits } from "@/actions/fetchForfaits";
import ForfaitsTable from "@/components/admin/ForfaitsTable";

const ForfaitsPage = async () => {
  const allForfaits = await fetchForfaits();

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const activeForfaits = allForfaits.filter(
    (forfait) => new Date(forfait.expiresAt) >= today
  );
  const expiredForfaits = allForfaits.filter(
    (forfait) => new Date(forfait.expiresAt) < today
  );

  return (
    <>
      <section className="w-full">
        {activeForfaits.length === 0 ? (
          <p className="text-gray-500 mt-4">
            Aucun forfait actif pour le moment.
          </p>
        ) : (
          <ForfaitsTable forfaits={activeForfaits} title="Forfaits Actifs" />
        )}
      </section>

      {expiredForfaits.length !== 0 && (
        <>
          <hr className="my-10" />
          <section className="w-full">
            <ForfaitsTable
              forfaits={expiredForfaits}
              title="Forfaits Expirés"
            />
          </section>
        </>
      )}
    </>
  );
};

export default ForfaitsPage;
