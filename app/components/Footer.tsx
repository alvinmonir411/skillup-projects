"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Facebook, Instagram, Linkedin, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 pt-14 pb-10 mt-20 border-t border-gray-700">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* LOGO + DESC */}
        <div>
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="flex items-center gap-2 mb-4"
          >
            <Image
              src="/logo.png"
              alt="Brand Logo"
              width={45}
              height={45}
              className="rounded-md"
            />
            <span className="text-xl font-semibold text-white tracking-wide">
              SkillBridge
            </span>
          </motion.div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Empowering talent, one skill at a time. Let’s build the
            future—clean, bold, and ambitious.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {[
              { name: "Home", href: "/" },
              { name: "Browse Skills", href: "/BrowseSkills" },
              { name: "How It Works", href: "/how-it-works" },
              { name: "About", href: "/about" },
              { name: "Dashboard", href: "/dashboard" },
            ].map((item, i) => (
              <motion.li
                key={i}
                whileHover={{ x: 6 }}
                className="transition-all"
              >
                <Link
                  href={item.href}
                  className="hover:text-white duration-200"
                >
                  {item.name}
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-white">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex items-center gap-4">
            {[Facebook, Instagram, Linkedin, Github].map((Icon, i) => (
              <motion.a
                key={i}
                whileHover={{ y: -4 }}
                href="#"
                className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition"
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center text-gray-500 text-sm mt-10 border-t border-gray-700 pt-5">
        © {new Date().getFullYear()} SkillBridge. Designed with ❤️ and too much
        coffee.
      </div>
    </footer>
  );
}
