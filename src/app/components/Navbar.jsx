"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar({ isMenuOpen = false, onToggle, isMobile = false }) {
  const pathname = usePathname();

  // 🔁 Dashboard dipindah ke urutan pertama
  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Tugas", path: "/tugas" },
    { name: "Kalender", path: "/kalender" },
    { name: "Fokus", path: "/fokus" },
    { name: "Ide", path: "/ide" },
  ];

  const handleLinkClick = () => {
    if (isMobile && onToggle) onToggle(false);
  };

  // === DESKTOP NAVBAR ===
  if (!isMobile) {
    return (
      <nav className="bg-[#FFF9FB] border-b border-[#F8BBD0] px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-4 md:gap-6">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={handleLinkClick}
                className={`relative px-4 py-2.5 rounded-lg font-semibold transition-colors ${
                  isActive
                    ? "text-[#E91E63] bg-[#FCE4EC]"
                    : "text-[#AD1457] hover:text-[#C2185B] hover:bg-[#FFF0F5]"
                }`}
              >
                {item.name}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3/4 h-0.5 bg-[#E91E63] rounded-full"></span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    );
  }

  // === MOBILE NAVBAR (Burger Menu) ===
  return (
    isMenuOpen && (
      <div className="md:hidden bg-[#FFF9FB] border-t border-[#F8BBD0]">
        <div className="px-6 py-4 flex flex-col gap-3">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={handleLinkClick}
                className={`relative px-3 py-2.5 rounded-lg font-semibold transition-colors ${
                  isActive
                    ? "text-[#E91E63] bg-[#FCE4EC]"
                    : "text-[#AD1457] hover:text-[#C2185B] hover:bg-[#FFF0F5]"
                }`}
              >
                {item.name}
                {isActive && (
                  <span className="absolute -bottom-1 left-4 w-6 h-0.5 bg-[#E91E63] rounded-full"></span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    )
  );
}