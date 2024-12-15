import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  color?: "white" | "black";
};

const Logo = ({ color = "black" }: LogoProps) => {
  return (
    <Link href={"/"}>
      <div className="relative w-[200px]">
        <Image
          src={color === "white" ? "/logo_white.svg" : "/logo.svg"}
          alt="Logo Oshun"
          width={200}
          height={40}
          className="object-cover"
        />
      </div>
    </Link>
  );
};

export default Logo;
