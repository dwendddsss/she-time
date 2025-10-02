"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Tugas", path: "/tugas", color: "text-pink-600", activeColor: "text-pink-800" },
    { name: "Kalender", path: "/kalender", color: "text-purple-600", activeColor: "text-purple-800" },
    { name: "Fokus", path: "/fokus", color: "text-indigo-600", activeColor: "text-indigo-800" },
    { name: "Ide", path: "/ide", color: "text-rose-600", activeColor: "text-rose-800" },
    { name: "Dashboard", path: "/dashboard", color: "text-violet-600", activeColor: "text-violet-800" },
  ];

  return (
    <nav className="flex items-center justify-center px-4 py-4 bg-white/80 backdrop-blur-sm shadow-sm border-b border-white/50">
      <div className="flex flex-wrap justify-center gap-6 md:gap-8">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`relative px-3 py-2 font-semibold transition-all duration-300 transform hover:scale-105 ${
                isActive
                  ? `${item.activeColor} scale-105`
                  : `${item.color} opacity-80 hover:opacity-100`
              }`}
            >
              {item.name}
              {/* Underline animasi saat aktif */}
              {isActive && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 rounded-full"></span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}