import ProfileForm from "@/components/profile/ProfileForm";
import { getCurrentUser, getUserProfile } from "@/actions/authActions";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    redirect("/login");
  }

  // Récupération des informations du profil
  const userData: any = await getUserProfile(currentUser.uid);

  if (!userData) {
    console.error("Utilisateur non trouvé dans Firestore.");
    return redirect("/login");
  }

  return (
    <section className="flex flex-col gap-8 max-w-[800px] w-full mx-auto my-20">
      <ProfileForm userData={userData} />
    </section>
  );
};

export default ProfilePage;
