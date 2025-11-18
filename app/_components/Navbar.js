"use client";

import LogoImage from "@/public/logo.png";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../_context/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const dropdownRef = useRef(null);

  function getInitials(name) {
    if (!name || name.trim().length === 0) return "";
    const trimmedName = name.trim();
    if (trimmedName.includes(" ")) {
      return trimmedName
        .split(" ")
        .filter(Boolean)
        .map((word) => word[0].toUpperCase())
        .join("");
    }
    const nameParts = trimmedName.split(/(?=[A-Z])/);
    return nameParts.map((part) => part[0].toUpperCase()).join("");
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <nav className="bg-yellow-500 border-b border-gray-200 shadow-sm w-full">
      {/* TOP SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between h-16">
          {/* LEFT: LOGO */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src={LogoImage}
              alt="SoundCore Logo"
              width={60}
              height={60}
              className="object-contain"
            />
          </Link>

          {/* CENTER: NAV LINKS */}
          <div className="hidden md:flex items-center space-x-6">
            {[
              { href: "/", label: "Home" },
              { href: "/sounds", label: "Sounds" },
              { href: "/categories", label: "Categories" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`font-medium transition-colors ${
                  pathname === href
                    ? "text-black font-semibold"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {label}
              </Link>
            ))}

            {user && (
              <Link
                href="/dashboard"
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* RIGHT: USER AREA */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                {/* DROPDOWN */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 font-bold hover:bg-gray-300 transition"
                  >
                    {getInitials(user.name)}
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-xl border border-gray-100 py-2 z-50 animate-in fade-in duration-150">
                      <div className="px-4 py-2 border-b border-gray-200">
                        <p className="text-sm font-semibold text-gray-800">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Profile
                      </Link>
                      <Link
                        href="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sound List
                      </Link>
                      <Link
                        href="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Cart
                      </Link>
                      <button
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 text-sm cursor-pointer text-gray-700 hover:bg-gray-100"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link href="/sign-in">
                <UserCircleIcon className="h-8 w-8 text-gray-700 hover:text-black transition-colors" />
              </Link>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-inner border-t border-gray-200">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {[
              { href: "/", label: "Home" },
              { href: "/sounds", label: "Sounds" },
              { href: "/categories", label: "Categories" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="block text-gray-700 hover:text-purple-600 font-medium py-1"
              >
                {label}
              </Link>
            ))}

            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="block text-gray-700 hover:text-purple-600 font-medium"
                >
                  Dashboard
                </Link>
                <Link
                  href="/cart"
                  className="block text-gray-700 hover:text-purple-600 font-medium"
                >
                  Cart
                </Link>
                <button
                  onClick={logout}
                  className="block w-full text-left text-gray-700 hover:text-purple-600 font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/sign-up"
                className="block text-gray-700 hover:text-purple-600 font-medium"
              >
                Sign Up
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
