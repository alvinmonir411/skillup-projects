"use client";

import Image from "next/image";
import Link from "next/link";
import Auth from "./Auth";
import { useState } from "react";

const Navber = () => {
  const [isOpen, setIsOpen] = useState(false);

  const Navlinks = [
    { href: "/", name: "Home" },
    { href: "/BrowseSkills", name: "Browse Skills" },
    { href: "/HowItWorks", name: "How It Works" },
    { href: "/About", name: "About" },
    { href: "/dashboard", name: "Dashboard" },
  ];

  return (
    <nav className="shadow-2xl border-b bg-white dark:bg-gray-800 dark:border-gray-700">
      <div className="container mx-auto p-4 flex justify-between items-center relative">
        {/* Logo */}
        <div>
          <Link href="/">
            <Image
              src={"/logo.png"}
              alt="logo"
              width={100}
              height={40}
              className="rounded-full"
            />
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex justify-center gap-6 items-center">
          {Navlinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-700 hover:text-green-500 transition duration-300 dark:text-gray-300 dark:hover:text-green-400 font-medium"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Auth Component and Mobile Menu Button */}
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <Auth />
          </div>

          {/* Mobile Menu Button (Hamburger) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 dark:text-gray-300 hover:text-green-500 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Content (Dropdown) */}
      <div
        className={`md:hidden ${
          isOpen ? "block" : "hidden"
        } transition-all duration-300 ease-in-out`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center border-t dark:border-gray-700">
          {Navlinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)} // Close menu on link click
              className="block w-full text-center py-2 text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-gray-700 hover:text-green-600 rounded-md font-medium"
            >
              {link.name}
            </Link>
          ))}
          <div className="w-full pt-4 pb-2">
            <Auth /> {/* Place Auth component here for mobile view */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navber;
