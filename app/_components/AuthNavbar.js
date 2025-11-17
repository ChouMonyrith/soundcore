import { UserCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import LogoImage from "@/public/whitelogo.jpg";

export default function AuthNavbar({ type = "signin" }) {
  return (
    <nav className="bg-black w-full z-10bg text-gray-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 ">
          <div className="shrink-0">
            <Link href="/" className={`text-xl font-bold text-black-400 m-0`}>
              <Image
                src={LogoImage}
                alt="SoundCore Logo"
                width={80}
                height={80}
              />
            </Link>
          </div>

          {type === "signin" ? (
            <Link
              href="/sign-up"
              className="ml-4 text-white flex items-center justify-center px-3 py-2 rounded-md text-md font-medium gap-2"
            >
              <UserCircleIcon className="h-8 w-8" />
              Sign In
            </Link>
          ) : (
            <Link
              href="/sign-in"
              className="ml-4 text-white flex items-center justify-center px-3 py-2 rounded-md text-md font-medium gap-2"
            >
              <UserCircleIcon className="h-8 w-8" />
              Sign Up
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
