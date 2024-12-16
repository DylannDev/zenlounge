import Logo from "./Logo";
import Navlinks from "./Navlinks";

const Navbar = () => {
  return (
    <div className="h-[100px] flex items-center justify-between lg:px-10">
      <Logo />
      <Navlinks />
    </div>
  );
};

export default Navbar;
