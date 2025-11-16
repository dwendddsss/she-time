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
    <header className="relative px-4 py-10 text-center overflow-hidden hidden md:block">
      {/* Animated floating elements — soft & subtle */}
      <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-[#FCE4EC] opacity-30 blur-3xl animate-pulse-slow"></div>
      <div className="absolute -bottom-16 -right-12 w-56 h-56 rounded-full bg-[#F8BBD0] opacity-20 blur-3xl animate-float"></div>

      <h1 className="text-4xl md:text-5xl font-bold mb-4 relative z-10">
        <span className="text-[#E91E63]">
          SheTime
        </span>
      </h1>

      <p className="max-w-lg mx-auto mb-10 px-4 text-sm md:text-base text-[#AD1457]">
        <span className="text-[#E91E63] font-medium">
          Rencanakan lebih cerdas • Bekerja lebih efisien • Hidup lebih bahagia
        </span>
      </p>

      <div className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-[#FCE4EC] border border-[#F8BBD0]">
        <span className="text-[#C2185B] font-medium text-sm md:text-base">
          {currentDate}
        </span>
      </div>
    </header>
  );
}