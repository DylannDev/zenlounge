import { getCurrentUser } from "@/actions/authActions";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import Navlinks from "./Navlinks";
import LoggedInMenu from "./LoggedInMenu";
import Button from "./Button";
import { PiSignInBold } from "react-icons/pi";
import ClientPathChecker from "./ClientPathChecker";

const Navbar = async () => {
  const user = await getCurrentUser();

  return (
    <ClientPathChecker>
      <div className="relative flex items-center justify-between px-5 min-[900px]:px-16 lg:px-20 mx-auto max-w-[1600px] w-full">
        <Logo />
        <div className="flex items-center gap-2">
          <MobileMenu />
          <div className="flex lg:hidden">
            <LoggedInMenu />
          </div>
        </div>
        <div className="hidden lg:flex items-center">
          <Navlinks />
          <div className="ml-8">
            {user !== null ? (
              <LoggedInMenu />
            ) : (
              <Button
                color="rose"
                icon={<PiSignInBold />}
                href="/login"
                compact
              >
                Connexion
              </Button>
            )}
          </div>
        </div>
      </div>
    </ClientPathChecker>
  );
};

export default Navbar;
