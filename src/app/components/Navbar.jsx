"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar({ isMenuOpen = false, onToggle, isMobile = false }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Tugas", path: "/tugas" },
    { name: "Kalender", path: "/kalender" },
    { name: "Fokus", path: "/fokus" },
    { name: "Ide", path: "/ide" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  const handleLinkClick = () => {
    if (isMobile && onToggle) onToggle(false);
  };

  // === DESKTOP NAVBAR ===
  if (!isMobile) {
    return (
      <nav className="bg-gradient-to-r from-pink-50 via-purple-50 to-indigo-50 backdrop-blur-sm shadow-sm border-b border-white/60 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-4 md:gap-6">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={handleLinkClick}
                className={`relative px-4 py-2.5 rounded-xl font-semibold text-pink-600 transition-all duration-300 hover:scale-105 ${
                  isActive
                    ? "text-pink-800 bg-pink-100 shadow-sm"
                    : "opacity-80 hover:opacity-100 hover:bg-white/50"
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
      </nav>
    );
  }

  // === MOBILE NAVBAR ===
  return (
    isMenuOpen && (
      <div className="md:hidden bg-white/90 backdrop-blur-sm border-t border-pink-100 shadow-sm">
        <div className="px-6 py-4 flex flex-col gap-3">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={handleLinkClick}
                className={`relative px-3 py-2 rounded-lg font-semibold text-pink-700 transition-all ${
                  isActive
                    ? "bg-pink-100 text-pink-800 shadow-sm"
                    : "hover:bg-pink-50"
                }`}
              >
                {item.name}
                {isActive && (
                  <span className="absolute -bottom-1 left-4 w-6 h-1 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full"></span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    )
  );
}
