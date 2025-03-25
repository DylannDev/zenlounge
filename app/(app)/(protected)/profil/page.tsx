import ProfileForm from "@/components/profile/ProfileForm";
import { permanentRedirect } from "next/navigation";
import { getCurrentUser, getUserProfile } from "@/actions/authActions";

const ProfilePage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return permanentRedirect("/login");
  }

  // Récupération des informations du profil
  const userData: any = await getUserProfile(currentUser.uid);

  return (
    <section className="flex flex-col gap-8 max-w-[800px] w-full mx-auto my-20">
      <ProfileForm userData={userData} provider={currentUser.provider} />
    </section>
  );
};

export default ProfilePage;
