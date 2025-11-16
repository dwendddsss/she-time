"use client";
import { useState, useEffect } from "react";
import {
  User,
  Home,
  Briefcase,
  Clock,
  Bell,
  Clipboard,
  Plus,
  Pencil,
  Trash2,
  X,
} from "lucide-react";

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

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!agendas || Object.keys(agendas).length === 0) return;
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
    "text-[#E91E63]", "text-[#C2185B]", "text-[#AD1457]", "text-[#E91E63]",
    "text-[#C2185B]", "text-[#AD1457]", "text-[#E91E63]"
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
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setIsModalOpen(false);
  };

  const deleteEvent = (eventDate, id) => {
    const updated = {
      ...agendas,
      [eventDate]: (agendas[eventDate] || []).filter((ev) => ev.id !== id),
    };
    setAgendas(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
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

  const categoryIcons = {
    personal: <User className="w-3.5 h-3.5" />,
    household: <Home className="w-3.5 h-3.5" />,
    business: <Briefcase className="w-3.5 h-3.5" />,
  };
  const categoryNames = { 
    personal: "Pribadi", 
    household: "Rumah", 
    business: "Bisnis" 
  };
  const priorityColors = {
    high: "border-l-[#EF4444] bg-[#FEF2F2]",
    medium: "border-l-[#F59E0B] bg-[#FFFBEB]",
    low: "border-l-[#9CA3AF] bg-[#F9FAFB]",
  };

  const eventsForSelectedDate = agendas[selectedDateForAgenda] || [];

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto bg-[#FFF9FB] min-h-screen">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[#E91E63]">
          Kalender Agenda
        </h2>
      </div>

      {/* Layout 2 Kolom */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Kalender */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={prevMonth} 
              className="p-2 rounded-lg bg-white border border-[#F8BBD0] hover:bg-[#FFF0F5] transition-colors"
            >
              ◀
            </button>
            <h3 className="text-lg font-semibold text-[#C2185B]">
              {monthNames[month]} {year}
            </h3>
            <button 
              onClick={nextMonth} 
              className="p-2 rounded-lg bg-white border border-[#F8BBD0] hover:bg-[#FFF0F5] transition-colors"
            >
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

              let cellClass = "h-16 flex flex-col items-center justify-center rounded-xl cursor-pointer transition-all border";

              if (isToday) {
                cellClass += " bg-[#FCE4EC] border-[#E91E63] text-[#E91E63] font-bold";
              } else if (hasAgenda) {
                cellClass += " bg-[#FCE4EC] border-[#F8BBD0] text-[#C2185B] font-medium";
              } else {
                cellClass += " bg-white border-[#F8BBD0] text-[#AD1457] hover:bg-[#FFF0F5]";
              }

              return (
                <div
                  key={i}
                  onClick={() => handleDateClick(day)}
                  className={cellClass}
                >
                  <span>{day}</span>
                  {hasAgenda && (
                    <span className="mt-1 px-2 py-0.5 bg-[#E91E63] text-white text-xs rounded-full font-medium">
                      +{agendas[dateKey].length}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar Agenda */}
        <div className="bg-white rounded-xl p-5 border border-[#F8BBD0] shadow-sm h-fit">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-[#C2185B]">Agenda</h3>
            <button
              onClick={() =>
                openAddModal(parseInt(selectedDateForAgenda.split("-")[2]))
              }
              className="text-xs bg-[#FCE4EC] text-[#E91E63] px-2.5 py-1 rounded-lg hover:bg-[#F8BBD0] transition-colors flex items-center gap-1"
            >
              <Plus size={14} />
              Tambah
            </button>
          </div>

          <p className="text-sm text-[#AD1457] mb-4">
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
                      className="text-xs bg-[#FCE4EC] text-[#E91E63] px-2 py-0.5 rounded flex items-center gap-0.5"
                    >
                      <Pencil size={12} />
                      Edit
                    </button>
                    <button
                      onClick={() => deleteEvent(event.date, event.id)}
                      className="text-xs bg-[#FEF2F2] text-[#EF4444] px-2 py-0.5 rounded flex items-center gap-0.5"
                    >
                      <Trash2 size={12} />
                      Hapus
                    </button>
                  </div>
                  <div className="pr-20">
                    <div className="text-xs font-medium text-[#AD1457] flex items-center gap-1.5">
                      {categoryIcons[event.category]} {categoryNames[event.category]}
                    </div>
                    <div className="text-sm mt-1 font-medium text-[#C2185B]">{event.title}</div>
                    <div className="text-xs text-[#AD1457] mt-1 flex items-center gap-1">
                      <Clock size={12} /> {event.startTime} - {event.endTime}
                    </div>
                    {event.reminderTime && (
                      <div className="text-xs text-[#F59E0B] mt-1 flex items-center gap-1">
                        <Bell size={12} /> Reminder: {event.reminderTime}
                      </div>
                    )}
                    {event.description && (
                      <div className="text-xs text-[#AD1457] mt-1 flex items-start gap-1">
                        <Clipboard size={12} className="mt-0.5 flex-shrink-0" /> {event.description}
                      </div>
                    )}
                  </div>
                  <div className="absolute bottom-2 right-2">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        event.priority === "high"
                          ? "bg-[#FEF2F2] text-[#EF4444]"
                          : event.priority === "medium"
                          ? "bg-[#FFFBEB] text-[#F59E0B]"
                          : "bg-[#F9FAFB] text-[#6B7280]"
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
              <p className="text-[#AD1457] text-sm">Belum ada agenda.</p>
            )}
          </div>
        </div>
      </div>

      {/* Modal Tambah/Edit Agenda */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#FFF9FB]/90 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 border border-[#F8BBD0]">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xl font-bold text-[#C2185B]">
                {eventToEdit ? "Edit Agenda" : "Tambah Agenda"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#AD1457] hover:text-[#E91E63] transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Judul agenda"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                className="w-full px-4 py-2.5 border border-[#F8BBD0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E91E63]"
              />

              <div>
                <label className="block text-sm font-medium text-[#C2185B] mb-1.5">
                  Kategori
                </label>
                <select
                  value={newEvent.category}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, category: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-[#F8BBD0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E91E63]"
                >
                  <option value="personal">Pribadi</option>
                  <option value="household">Rumah Tangga</option>
                  <option value="business">Bisnis</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#C2185B] mb-1.5">
                  Prioritas
                </label>
                <select
                  value={newEvent.priority}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, priority: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-[#F8BBD0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E91E63]"
                >
                  <option value="high">Tinggi</option>
                  <option value="medium">Sedang</option>
                  <option value="low">Rendah</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-[#C2185B] mb-1.5">
                    Mulai
                  </label>
                  <input
                    type="time"
                    value={newEvent.startTime}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, startTime: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-[#F8BBD0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E91E63]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#C2185B] mb-1.5">
                    Selesai
                  </label>
                  <input
                    type="time"
                    value={newEvent.endTime}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, endTime: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-[#F8BBD0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E91E63]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#C2185B] mb-1.5">
                  Reminder (opsional)
                </label>
                <input
                  type="time"
                  value={newEvent.reminderTime}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, reminderTime: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-[#F8BBD0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E91E63]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#C2185B] mb-1.5">
                  Deskripsi
                </label>
                <textarea
                  value={newEvent.description}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, description: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-[#F8BBD0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E91E63]"
                  rows="2"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 text-[#C2185B] border border-[#F8BBD0] rounded-lg hover:bg-[#FFF0F5] font-medium transition"
                >
                  Batal
                </button>
                <button
                  onClick={saveEvent}
                  className="px-5 py-2.5 bg-[#E91E63] text-white rounded-lg hover:bg-[#C2185B] font-medium transition"
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