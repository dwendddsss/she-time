'use client';

import "./globals.css";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import Header from "./components/Header";
import Navbar from "./components/Navbar";


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";

  return (
    <html lang="id">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          {/* Header + Navbar hanya muncul kalau bukan landing page */}
          {!isLandingPage && (
            <>
              <Header />
              <Navbar />
            </>
          )}

          {/* Konten halaman */}
          <main className={!isLandingPage ? "p-6" : "min-h-screen"}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
