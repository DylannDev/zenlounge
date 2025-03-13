const StatusBadge = ({ status }: { status: string }) => {
  return (
    <span
      className={`px-3 py-[6px] rounded-lg text-sm font-semibold w-fit ${
        status === "confirmed" || status === "Actif"
          ? "text-green-600 bg-green-100"
          : "text-red-600 bg-red-100"
      }`}
    >
      {status === "confirmed"
        ? "Confirmé"
        : status === "cancelled"
          ? "Annulé"
          : status}
    </span>
  );
};

export default StatusBadge;
