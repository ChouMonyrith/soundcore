import LogoImage from "@/public/logo.png";
import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center ">
      <Image
        src={LogoImage}
        alt="SoundCore Logo"
        width={100}
        height={100}
        className="object-contain"
      />
    </Link>
  );
}
