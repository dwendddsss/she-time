'use client';

import "./globals.css";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import { TimerProvider } from "./lib/TimerContext";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <html lang="id">
      <body className={inter.className}>
        <TimerProvider>
          <div className="min-h-screen bg-gray-50 relative">
            {!isLandingPage && (
              <>
                {/* MOBILE HEADER */}
                <div className="md:hidden">
                  <div className="relative px-4 py-4 flex justify-between items-start bg-gradient-to-r from-pink-50 via-purple-50 to-indigo-50 backdrop-blur-sm shadow-sm border-b border-white/60">
                    <div>
                      <h1 className="text-xl font-bold text-pink-600">SheTime</h1>
                      <div className="mt-1">
                        <div className="inline-flex items-center justify-center px-3 py-1.5 rounded-full bg-white/60 backdrop-blur-sm border border-white/30 shadow-sm">
                          <span className="text-gray-700 font-medium text-xs">
                            {new Date().toLocaleDateString("id-ID", {
                              weekday: "long",
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* BURGER BUTTON */}
                    <button
                      className="text-gray-700 focus:outline-none z-50"
                      onClick={toggleMenu}
                      aria-label="Toggle menu"
                    >
                      <span className="text-3xl">{isMenuOpen ? "✕" : "☰"}</span>
                    </button>
                  </div>

                  {/* NAVBAR MOBILE (slide-down effect) */}
                  <div
                    className={`transition-all duration-300 overflow-hidden ${
                      isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <Navbar
                      isMenuOpen={isMenuOpen}
                      onToggle={closeMenu}
                      isMobile={true}
                    />
                  </div>
                </div>

                {/* DESKTOP HEADER + NAVBAR */}
                <div className="hidden md:block">
                  <Header />
                  <Navbar />
                </div>
              </>
            )}

            <main className={!isLandingPage ? "p-6" : "min-h-screen"}>
              {children}
            </main>
          </div>
        </TimerProvider>
      </body>
    </html>
  );
}
