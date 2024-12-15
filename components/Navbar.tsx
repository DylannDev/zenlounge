import Logo from "./Logo";
import Navlinks from "./Navlinks";

const Navbar = () => {
  return (
    <div className="h-[80px] flex items-center justify-between px-10">
      <Logo />
      <Navlinks />
    </div>
  );
};

export default Navbar;
