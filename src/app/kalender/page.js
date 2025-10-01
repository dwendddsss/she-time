"use client";
import { useState } from "react";

export default function Kalender() {
  // Ambil bulan & tahun sekarang
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);

  const month = currentDate.getMonth(); // 0 = Jan
  const year = currentDate.getFullYear();

  // Nama bulan dan hari
  const monthNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  const dayNames = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

  // Hitung jumlah hari dalam bulan ini
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Cari hari pertama jatuh di hari apa
  const firstDay = new Date(year, month, 1).getDay();

  // Buat array isi kalender
  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null); // kosong sebelum tanggal 1
  }
  for (let d = 1; d <= daysInMonth; d++) {
    calendarDays.push(d);
  }

  // Ganti bulan
  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };
  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  return (
    <>
        {/* Header navigasi bulan */}
        <div className="flex items-center justify-between mb-10">
          <button
            onClick={prevMonth}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            &lt;
          </button>
          <h3 className="text-lg font-semibold">
            {monthNames[month]} {year}
          </h3>
          <button
            onClick={nextMonth}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            &gt;
          </button>
        </div>

        {/* Grid hari */}
        <div className="grid grid-cols-7 gap-2 text-center font-medium">
          {dayNames.map((day, i) => (
            <div key={i} className="text-pink-600">{day}</div>
          ))}
          {calendarDays.map((day, i) => (
            <div
              key={i}
              className={`h-16 flex items-center justify-center rounded-lg ${
                day === today.getDate() &&
                month === today.getMonth() &&
                year === today.getFullYear()
                  ? "bg-pink-500 text-white font-bold"
                  : "bg-gray-100"
              }`}
            >
              {day || ""}
            </div>
          ))}
        </div>
    </>
  );
}
