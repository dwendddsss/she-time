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
    <div className="p-6 text-center">
      <h2 className="text-3xl font-bold text-pink-600 mb-2">SheTime</h2>
      <h4 className="text-gray-600 max-w-2xl mx-auto leading-relaxed mb-3">
        Kelola Tugas | Pantau Keuangan | Atur Jadwal | Catat Ide | Alat Produktivitas
      </h4>
      <p className="text-gray-500 text-lg font-medium">
        {currentDate}
      </p>
    </div>
  );
}