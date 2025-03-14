import Button from "./Button";

interface UserInfoDisplayProps {
  clientInfo: {
    clientName: string;
    clientEmail: string;
    clientPhone: string;
  };
  handleBooking: (formData: any) => Promise<void>;
  isLoading: boolean;
}

const UserInfoDisplay: React.FC<UserInfoDisplayProps> = ({
  clientInfo,
  handleBooking,
  isLoading,
}) => {
  const userInfoFields = [
    { label: "Nom", value: clientInfo?.clientName },
    { label: "Email", value: clientInfo?.clientEmail },
    { label: "Téléphone", value: clientInfo?.clientPhone },
  ];

  return (
    <div className="">
      <ul className="flex flex-col gap-2">
        {userInfoFields.map((field, index) => (
          <li key={index} className=" text-blue-light">
            <span className="font-semibold">{field.label} :</span> {field.value}
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-2 mt-12">
        <Button button onClick={handleBooking} disabled={isLoading}>
          {isLoading ? "Chargement..." : "Réserver"}
        </Button>
      </div>
    </div>
  );
};

export default UserInfoDisplay;
