"use client";
import { useState, useEffect } from "react";

export default function Header() {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const now = new Date();
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const formattedDate = now.toLocaleDateString("id-ID", options);
    setCurrentDate(formattedDate);
  }, []);

  return (
    <header className="relative px-4 py-10 text-center overflow-hidden">
      <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-pink-200 opacity-30 blur-3xl animate-pulse-slow"></div>
      <div className="absolute -bottom-16 -right-12 w-56 h-56 rounded-full bg-purple-200 opacity-25 blur-3xl animate-float"></div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 relative z-10">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-gradient">
          SheTime✨
        </span>
      </h1>

      <p className="max-w-lg mx-auto mb-5 px-2 text-sm md:text-base">
        <span className="text-pink-500 font-medium">Rencanakan</span> •{" "}
        <span className="text-purple-500 font-medium">Atur</span> •{" "}
        <span className="text-indigo-500 font-medium">Catat</span> •{" "}
        <span className="text-rose-500 font-medium">Kelola</span> •{" "}
        <span className="text-violet-500 font-medium">Wujudkan</span>
      </p>

      <div className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-white/60 backdrop-blur-sm border border-white/30 shadow-md">
        <span className="text-gray-700 font-medium text-sm md:text-base">
          {currentDate}
        </span>
      </div>
    </header>
  );
}