"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Tugas", path: "/tugas", color: "text-pink-600", activeColor: "text-pink-800", bg: "bg-pink-100" },
    { name: "Kalender", path: "/kalender", color: "text-purple-600", activeColor: "text-purple-800", bg: "bg-purple-100" },
    { name: "Fokus", path: "/fokus", color: "text-indigo-600", activeColor: "text-indigo-800", bg: "bg-indigo-100" },
    { name: "Ide", path: "/ide", color: "text-rose-600", activeColor: "text-rose-800", bg: "bg-rose-100" },
    { name: "Dashboard", path: "/dashboard", color: "text-violet-600", activeColor: "text-violet-800", bg: "bg-violet-100" },
  ];

  // Tutup menu saat klik link (mobile)
  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-pink-50 via-purple-50 to-indigo-50 backdrop-blur-sm shadow-sm border-b border-white/60 px-4 py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/dashboard" className="text-pink-600 font-bold text-lg md:hidden">
          SheTime
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center justify-center flex-1">
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={handleLinkClick}
                  className={`relative px-4 py-2.5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                    isActive
                      ? `${item.activeColor} ${item.bg} shadow-sm`
                      : `${item.color} opacity-90 hover:opacity-100 hover:bg-white/50`
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 rounded-full"></span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 focus:outline-none z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <span className="text-2xl">✕</span>
          ) : (
            <span className="text-2xl">☰</span>
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-sm border-t border-white/60">
          <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-3">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={handleLinkClick}
                  className={`relative px-4 py-3 rounded-xl font-semibold transition-all ${
                    isActive
                      ? `${item.activeColor} ${item.bg} shadow-sm`
                      : `${item.color} opacity-90`
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute -bottom-1 left-4 w-8 h-1 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full"></span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}