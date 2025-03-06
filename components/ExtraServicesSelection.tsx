import Counter from "./Counter";

export const ExtraServicesSelection = ({
  extraServices,
  setExtraServices,
}: {
  extraServices: ExtraService[];
  setExtraServices: (services: ExtraService[]) => void;
}) => {
  // 📌 Mise à jour des services supplémentaires
  const updateServiceQuantity = (name: string, increment: boolean) => {
    setExtraServices((prev) =>
      prev.map((service) =>
        service.name === name
          ? {
              ...service,
              quantity: increment
                ? service.quantity + 1
                : Math.max(service.quantity - 1, 0),
            }
          : service
      )
    );
  };

  return (
    <div className="mt-5">
      <h3 className="text-xl font-bold mb-5">Extras</h3>
      <ul className="flex flex-col gap-2">
        {extraServices.map((service) => (
          <li key={service.name} className="flex items-center justify-between">
            <div className="flex gap-2 text-xl items-center">
              <span className="text-orange text-xl">{service.icon}</span>
              <div className="text-sm text-blue-light">
                <span>
                  {service.name} : {service.price}€
                </span>
              </div>
            </div>
            <Counter
              value={service.quantity}
              onIncrement={() => updateServiceQuantity(service.name, true)}
              onDecrement={() => updateServiceQuantity(service.name, false)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
