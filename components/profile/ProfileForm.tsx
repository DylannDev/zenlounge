import InfosProfileForm from "./InfosProfileForm";
import CredentialProfileForm from "./CredentialProfileForm";
import { PiUserCircleLight } from "react-icons/pi";
import { formatDate } from "@/lib/utils";
import { UserData } from "@/types/userData";

const ProfileForm = ({ userData }: { userData: UserData }) => {
  const createdAt = userData?.createdAt && new Date(userData?.createdAt);
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold">
            {userData?.firstName || ""} {userData?.lastName || ""}
          </h1>
          <p className="text-blue-light">
            Membre depuis le :{" "}
            {userData?.createdAt
              ? formatDate(createdAt!, false)
              : "Date inconnue"}
          </p>
        </div>
        <PiUserCircleLight className="text-[120px] text-rose" />
      </div>

      <div className="flex flex-col gap-8">
        <InfosProfileForm userData={userData} />
        <hr />
        <CredentialProfileForm />
      </div>
    </>
  );
};

export default ProfileForm;
