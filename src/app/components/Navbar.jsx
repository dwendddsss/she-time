"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Tugas", path: "/tugas" },
    { name: "Kalender", path: "/kalender" },
    { name: "Fokus", path: "/fokus" },
    { name: "Ide", path: "/ide" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  return (
    <nav className="flex items-center justify-center px-4 py-4 bg-white shadow-md">
      <div className="flex gap-8 text-pink-700 font-medium">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`transition-colors duration-200 hover:text-pink-500 ${
              pathname === item.path
                ? "text-pink-600 font-bold"
                : "text-pink-700"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}