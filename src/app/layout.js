'use client';

import "./globals.css";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import { TimerProvider } from "./lib/TimerContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";

  return (
    <html lang="id">
      <body className={inter.className}>
        <TimerProvider> 
          <div className="min-h-screen bg-gray-50">
            {!isLandingPage && (
              <>
                <Header />
                <Navbar />
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