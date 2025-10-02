"use client";
import { useState, useEffect } from "react";

const STORAGE_KEY = "kalender_agendas";

export default function Kalender() {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const [agendas, setAgendas] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventToEdit, setEventToEdit] = useState(null);
  const [selectedDateForAgenda, setSelectedDateForAgenda] = useState(
    today.toISOString().split("T")[0]
  );

  // ✅ Load data dari localStorage
 useEffect(() => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setAgendas(JSON.parse(saved));
      } catch (e) {
        console.error("Gagal memuat data dari localStorage", e);
        setAgendas({});
      }
    }
  }
}, []);


  // ✅ Simpan otomatis setiap kali agendas berubah
 useEffect(() => {
  if (typeof window === "undefined") return;
  if (!agendas || Object.keys(agendas).length === 0) return; // 🚫 jangan simpan kalau kosong
  localStorage.setItem(STORAGE_KEY, JSON.stringify(agendas));
}, [agendas]);


  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const monthNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  const dayNames = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
  const dayColors = [
    "text-red-500", "text-blue-500", "text-green-500", "text-yellow-500",
    "text-purple-500", "text-pink-500", "text-teal-500"
  ];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) calendarDays.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendarDays.push(d);

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const getDateKey = (day) => {
    const m = String(month + 1).padStart(2, "0");
    const d = String(day).padStart(2, "0");
    return `${year}-${m}-${d}`;
  };

  const [newEvent, setNewEvent] = useState({
    title: "",
    category: "personal",
    priority: "medium",
    date: "",
    startTime: "09:00",
    endTime: "10:00",
    description: "",
    reminderTime: "",
  });

  const openAddModal = (day) => {
    const dateKey = getDateKey(day);
    setEventToEdit(null);
    setNewEvent({
      title: "",
      category: "personal",
      priority: "medium",
      date: dateKey,
      startTime: "09:00",
      endTime: "10:00",
      description: "",
      reminderTime: "",
    });
    setSelectedDateForAgenda(dateKey);
    setIsModalOpen(true);
  };

  const openEditModal = (event) => {
    setEventToEdit(event);
    setNewEvent({
      title: event.title,
      category: event.category,
      priority: event.priority,
      date: event.date,
      startTime: event.startTime,
      endTime: event.endTime,
      description: event.description || "",
      reminderTime: event.reminderTime || "",
    });
    setSelectedDateForAgenda(event.date);
    setIsModalOpen(true);
  };

  // ✅ Simpan data langsung ke localStorage juga
  const saveEvent = () => {
    if (!newEvent.title.trim()) {
      alert("Judul wajib diisi!");
      return;
    }

    const event = {
      id: eventToEdit ? eventToEdit.id : Date.now(),
      title: newEvent.title,
      category: newEvent.category,
      priority: newEvent.priority,
      date: newEvent.date,
      startTime: newEvent.startTime,
      endTime: newEvent.endTime,
      description: newEvent.description,
      reminderTime: newEvent.reminderTime,
    };

    const updated = {
      ...agendas,
      [newEvent.date]: eventToEdit
        ? (agendas[newEvent.date] || []).map((ev) =>
            ev.id === event.id ? event : ev
          )
        : [...(agendas[newEvent.date] || []), event],
    };

    setAgendas(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); // 💾 simpan langsung
    setIsModalOpen(false);
  };

  const deleteEvent = (eventDate, id) => {
    const updated = {
      ...agendas,
      [eventDate]: (agendas[eventDate] || []).filter((ev) => ev.id !== id),
    };
    setAgendas(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); // 💾 update langsung
  };

  const handleDateClick = (day) => {
    if (!day) return;
    const dateKey = getDateKey(day);
    setSelectedDateForAgenda(dateKey);
  };

  useEffect(() => {
    const todayKey = today.toISOString().split("T")[0];
    setSelectedDateForAgenda(todayKey);
  }, [month, year]);

  const categoryIcons = { personal: "👤", household: "🏡", business: "💼" };
  const categoryNames = { personal: "Pribadi", household: "Rumah", business: "Bisnis" };
  const priorityColors = {
    high: "border-l-red-500 bg-red-50",
    medium: "border-l-amber-500 bg-amber-50",
    low: "border-l-gray-400 bg-gray-50",
  };

  const eventsForSelectedDate = agendas[selectedDateForAgenda] || [];

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">🗓️ Kalender Agenda</h2>
      </div>

      {/* Layout 2 Kolom */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Kalender */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <button onClick={prevMonth} className="p-2 rounded hover:bg-gray-200">
              ◀
            </button>
            <h3 className="text-lg font-semibold">
              {monthNames[month]} {year}
            </h3>
            <button onClick={nextMonth} className="p-2 rounded hover:bg-gray-200">
              ▶
            </button>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {dayNames.map((day, i) => (
              <div key={i} className={`text-center py-2 font-semibold ${dayColors[i]}`}>
                {day}
              </div>
            ))}
            {calendarDays.map((day, i) => {
              if (day === null) return <div key={i} className="h-16"></div>;

              const dateKey = getDateKey(day);
              const hasAgenda = agendas[dateKey]?.length > 0;
              const isToday =
                day === today.getDate() &&
                month === today.getMonth() &&
                year === today.getFullYear();

              let bgColor = "bg-white";
              if (isToday) {
                bgColor = "bg-gradient-to-br from-pink-400 to-rose-400 text-white";
              } else if (hasAgenda) {
                bgColor = "bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200";
              } else {
                bgColor = "bg-gray-50 hover:bg-gray-100";
              }

              return (
                <div
                  key={i}
                  onClick={() => handleDateClick(day)}
                  className={`h-16 flex flex-col items-center justify-center rounded-xl cursor-pointer transition-all shadow-sm ${bgColor} ${
                    !isToday && !hasAgenda ? "text-gray-700" : ""
                  }`}
                >
                  <span className="font-medium">{day}</span>
                  {hasAgenda && (
                    <span className="mt-1 px-1.5 py-0.5 bg-white bg-opacity-70 text-purple-700 text-xs rounded-full font-medium">
                      {agendas[dateKey].length}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar Agenda */}
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm h-fit">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800">Agenda</h3>
            <button
              onClick={() =>
                openAddModal(parseInt(selectedDateForAgenda.split("-")[2]))
              }
              className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200"
            >
              + Tambah
            </button>
          </div>

          <p className="text-sm text-gray-600 mb-4">
            {new Date(selectedDateForAgenda).toLocaleDateString("id-ID", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
            {eventsForSelectedDate.length > 0 ? (
              eventsForSelectedDate.map((event) => (
                <div
                  key={event.id}
                  className={`p-3 rounded-lg border-l-4 ${priorityColors[event.priority]} relative`}
                >
                  <div className="absolute top-2 right-2 flex gap-1">
                    <button
                      onClick={() => openEditModal(event)}
                      className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded hover:bg-blue-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteEvent(event.date, event.id)}
                      className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded hover:bg-red-200"
                    >
                      Hapus
                    </button>
                  </div>
                  <div className="pr-20">
                    <div className="text-xs font-medium text-gray-700 flex items-center gap-1">
                      {categoryIcons[event.category]} {categoryNames[event.category]}
                    </div>
                    <div className="text-sm mt-1 font-medium">{event.title}</div>
                    <div className="text-xs text-gray-600 mt-1">
                      🕒 {event.startTime} - {event.endTime}
                    </div>
                    {event.reminderTime && (
                      <div className="text-xs text-amber-600 mt-1 flex items-center gap-1">
                        🔔 Reminder: {event.reminderTime}
                      </div>
                    )}
                    {event.description && (
                      <div className="text-xs text-gray-500 mt-1">
                        📝 {event.description}
                      </div>
                    )}
                  </div>
                  <div className="absolute bottom-2 right-2">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        event.priority === "high"
                          ? "bg-red-100 text-red-800"
                          : event.priority === "medium"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {event.priority === "high"
                        ? "Tinggi"
                        : event.priority === "medium"
                        ? "Sedang"
                        : "Rendah"}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">Belum ada agenda.</p>
            )}
          </div>
        </div>
      </div>

      {/* Modal Tambah/Edit Agenda */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xl font-bold text-gray-800">
                {eventToEdit ? "✏️ Edit Agenda" : "➕ Tambah Agenda"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-800 text-2xl transition"
              >
                &times;
              </button>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Judul agenda"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Kategori
                </label>
                <select
                  value={newEvent.category}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, category: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  <option value="personal">👤 Pribadi</option>
                  <option value="household">🏡 Rumah Tangga</option>
                  <option value="business">💼 Bisnis</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Prioritas
                </label>
                <select
                  value={newEvent.priority}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, priority: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
                >
                  <option value="high">🔴 Tinggi</option>
                  <option value="medium">🟡 Sedang</option>
                  <option value="low">⚪ Rendah</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Mulai
                  </label>
                  <input
                    type="time"
                    value={newEvent.startTime}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, startTime: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Selesai
                  </label>
                  <input
                    type="time"
                    value={newEvent.endTime}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, endTime: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Reminder (opsional)
                </label>
                <input
                  type="time"
                  value={newEvent.reminderTime}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, reminderTime: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Deskripsi
                </label>
                <textarea
                  value={newEvent.description}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, description: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  rows="2"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition"
                >
                  Batal
                </button>
                <button
                  onClick={saveEvent}
                  className="px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 font-medium shadow transition transform hover:scale-105"
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
