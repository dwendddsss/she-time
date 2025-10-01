"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Tugas", path: "/tugas" },
    { name: "Kalender", path: "/kalender" },
    { name: "Alat", path: "/alat" },
    { name: "Ide", path: "/ide" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      <div className="flex gap-6 text-pink-700 font-medium">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`hover:text-pink-500 ${
              pathname === item.path ? "text-pink-600 font-bold" : ""
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
