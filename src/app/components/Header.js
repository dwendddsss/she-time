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

      <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-pink-200 opacity-30 blur-3xl animate-pulse-slow"></div>
      <div className="absolute -bottom-16 -right-12 w-56 h-56 rounded-full bg-rose-200 opacity-25 blur-3xl animate-float"></div>

      <h1 className="text-4xl md:text-5xl font-bold mb-4 relative z-10">
        <span className="text-pink-500">
          SheTime ✨
        </span>
      </h1>

      <p className="max-w-lg mx-auto mb-10 px-4 text-sm md:text-base text-pink-700">
        <span className="text-pink-500 font-medium">
          Rencanakan lebih cerdas • Bekerja lebih efisien • Hidup lebih bahagia
        </span>
      </p>

      <div className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-pink-100/70 backdrop-blur-sm border border-pink-200 shadow-sm">
        <span className="text-pink-800 font-medium text-sm md:text-base">
          {currentDate}
        </span>
      </div>
    </header>
  );
}