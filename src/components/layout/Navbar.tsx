"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserCircle, ChevronDown, LogOut, User } from "lucide-react";

interface NavbarProps {
  user: {
    name: string;
    role: string;
    avatarUrl?: string;
  };
}

const NAV_LINKS: { label: string; href: string }[] = [
  { label: "Dashboard", href: "/home" },
  { label: "Projects", href: "#" },
  { label: "R&D", href: "#" },
  { label: "Community", href: "#" },
];

export default function Navbar({ user }: NavbarProps) {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleLogout() {
    setDropdownOpen(false);
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => {});
    router.push("/login");
  }

  return (
    <nav className="bg-white border-b border-gray-100 px-6 py-3 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        {/* Logo */}
        <div className="flex items-center">
          <Image
            src="/10xdevs-bg-removed.svg"
            alt="10x Devs Logo"
            width={120}
            height={40}
            priority
            className="h-10 w-auto"
          />
        </div>

        {/* Desktop Tabs */}
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-500">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="relative cursor-pointer transition-colors duration-200 hover:text-red-600 group"
            >
              {label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-200 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Profile Section */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center gap-3 cursor-pointer rounded-lg px-2 py-1 hover:bg-gray-50 transition-colors duration-200"
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-gray-900 leading-none">{user.name}</p>
              <p className="text-xs text-gray-500 capitalize mt-1">{user.role}</p>
            </div>
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt="Avatar"
                className="h-10 w-10 rounded-full border-2 border-red-100 object-cover"
              />
            ) : (
              <UserCircle className="h-10 w-10 text-gray-400" />
            )}
            <ChevronDown
              className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden z-50">
              <button
                className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-150"
                onClick={() => { setDropdownOpen(false); router.push("#"); }}
              >
                <User className="h-4 w-4" />
                Profile
              </button>
              <div className="border-t border-gray-100" />
              <button
                className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-150"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          )}
        </div>

      </div>
    </nav>
  );
}