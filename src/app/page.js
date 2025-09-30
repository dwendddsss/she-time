"use client";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100 text-center">
      <h1 className="text-4xl font-bold text-pink-600 mb-4">SheTime✨</h1>
      <p className="text-gray-700 mb-6">
         Temukan keseimbangan, energi, dan fokusmu setiap hari.  
          Rencanakan hari dengan keanggunan dan ketenangan
      </p>
      <Link
        href="/dashboard"
        className="px-6 py-3 rounded-full bg-pink-500 text-white font-semibold hover:bg-pink-600 transition"
      >
        Mulai Hari Ini
      </Link>
    </div>
  );
}
