"use client";
import { useState } from "react";

export default function Kalender() {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const [agendas, setAgendas] = useState({}); 

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "", 
    startTime: "09:00",
    endTime: "10:00",
    description: "",
  });

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const monthNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  const dayNames = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    calendarDays.push(d);
  }

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };
  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const getDateKey = (day) => {
    const m = String(month + 1).padStart(2, '0');
    const d = String(day).padStart(2, '0');
    return `${year}-${m}-${d}`;
  };

  const openAddModal = () => {
    const todayISO = today.toISOString().split('T')[0]; // "2025-04-05"
    setNewEvent({
      title: "",
      date: todayISO,
      startTime: "09:00",
      endTime: "10:00",
      description: "",
    });
    setIsModalOpen(true);
  };

  
  const saveEvent = () => {
    if (!newEvent.title.trim()) {
      alert("Judul wajib diisi!");
      return;
    }
    if (!newEvent.date) {
      alert("Tanggal wajib diisi!");
      return;
    }

    const event = {
      title: newEvent.title,
      time: `${newEvent.startTime} - ${newEvent.endTime}`,
      description: newEvent.description || "-",
    };

    setAgendas(prev => {
      const currentEvents = prev[newEvent.date] || [];
      return {
        ...prev,
        [newEvent.date]: [...currentEvents, event]
      };
    });

    setIsModalOpen(false);
    alert(`Agenda "${newEvent.title}" berhasil disimpan untuk tanggal ${newEvent.date}!`);
  };


  const handleViewAgenda = (day) => {
    const key = getDateKey(day);
    const events = agendas[key] || [];

    if (events.length === 0) {
      alert(`Tidak ada agenda pada ${day} ${monthNames[month]} ${year}.`);
      return;
    }

    let message = `Agenda untuk ${day} ${monthNames[month]} ${year}:\n\n`;
    events.forEach((ev, i) => {
      message += `${i + 1}. ${ev.title}\n   🕒 ${ev.time}\n   📝 ${ev.description}\n\n`;
    });
    alert(message);
  };

  return (
    <>
      {/* Header dengan ikon panah SVG */}
      <div className="flex items-center justify-between mb-6">
        {/* Tombol bulan sebelumnya */}
        <button
          onClick={prevMonth}
          className="p-2 rounded-full hover:bg-gray-200 transition"
          aria-label="Bulan sebelumnya"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <h3 className="text-lg font-semibold">
          {monthNames[month]} {year}
        </h3>

        <div className="flex items-center gap-2">
          {/* Tombol bulan berikutnya */}
          <button
            onClick={nextMonth}
            className="p-2 rounded-full hover:bg-gray-200 transition"
            aria-label="Bulan berikutnya"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Tombol + */}
          <button
            onClick={openAddModal}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 font-bold"
          >
            +
          </button>
        </div>
      </div>

      {/* Grid hari */}
      <div className="grid grid-cols-7 gap-2 text-center font-medium">
        {dayNames.map((day, i) => (
          <div key={i} className="text-pink-600 py-2">{day}</div>
        ))}
        {calendarDays.map((day, i) => (
          <div
            key={i}
            className={`h-16 flex flex-col items-center justify-center rounded-lg ${
              day === today.getDate() &&
              month === today.getMonth() &&
              year === today.getFullYear()
                ? "bg-pink-500 text-white font-bold"
                : "bg-gray-100 cursor-pointer hover:bg-gray-200"
            }`}
            onClick={() => day && handleViewAgenda(day)}
          >
            {day || ""}
            {/* Tampilkan jumlah agenda */}
            {day && agendas[getDateKey(day)]?.length > 0 && (
              <span className="text-xs mt-1 text-white-600">
                ({agendas[getDateKey(day)].length})
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Modal Tambah Agenda */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Tambah Agenda</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Judul agenda"
                value={newEvent.title}
                onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* INPUT TANGGAL */}
              <div>
                <label className="block text-sm mb-1">Tanggal</label>
                <input
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>

              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-sm mb-1">Mulai</label>
                  <input
                    type="time"
                    value={newEvent.startTime}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, startTime: e.target.value }))}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm mb-1">Selesai</label>
                  <input
                    type="time"
                    value={newEvent.endTime}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, endTime: e.target.value }))}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-1">Deskripsi (opsional)</label>
                <textarea
                  value={newEvent.description}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border rounded focus:outline-none"
                  rows="3"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded hover:bg-gray-100"
                >
                  Batal
                </button>
                <button
                  onClick={saveEvent}
                  className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}