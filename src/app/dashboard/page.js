"use client";
import { useState, useEffect } from "react";

export default function DashboardPage() {
  const [mood, setMood] = useState(null);
  const [energy, setEnergy] = useState(null);
  const [prioritas, setPrioritas] = useState(null);
  const [ringkasan, setRingkasan] = useState({
    totalTugas: 0,
    selesai: 0,
    produktivitas: 0,
  });
  const [finance, setFinance] = useState({
    pemasukan: 0,
    pengeluaran: 0,
    saldo: 0,
  });

  useEffect(() => {
    // === Data dasar ===
    const savedMood = localStorage.getItem("mood");
    const savedEnergy = localStorage.getItem("energy");
    const savedTasks = JSON.parse(localStorage.getItem("daily_tasks") || "{}");
    const savedFinance = JSON.parse(localStorage.getItem("finance_data") || "[]");

    // === Gabungkan semua kategori tugas ===
    const allTasks = [
      ...(savedTasks.pribadi || []),
      ...(savedTasks.rumah || []),
      ...(savedTasks.bisnis || []),
    ];

    // === Tugas prioritas ===
    const starredTask = allTasks.find((task) => task.isFavorite);
    setPrioritas(starredTask ? starredTask.text : null);

    // === Mood dan energi ===
    setMood(savedMood || null);
    setEnergy(savedEnergy ? parseInt(savedEnergy, 10) : null);

    // === Produktivitas ===
    const total = allTasks.length;
    const selesai = allTasks.filter((t) => t.completed).length;
    const produktivitas = total > 0 ? Math.round((selesai / total) * 100) : 0;

    setRingkasan({ totalTugas: total, selesai, produktivitas });

    // === Keuangan hari ini ===
    const today = new Date().toISOString().split("T")[0]; // format yyyy-mm-dd
    const todayTransactions = savedFinance.filter((item) => item.date === today);

    const totalIncome = todayTransactions
      .filter((item) => item.type === "income")
      .reduce((sum, item) => sum + Number(item.amount || 0), 0);

    const totalExpense = todayTransactions
      .filter((item) => item.type === "expense")
      .reduce((sum, item) => sum + Number(item.amount || 0), 0);

    const saldo = totalIncome - totalExpense;

    setFinance({
      pemasukan: totalIncome,
      pengeluaran: totalExpense,
      saldo,
    });
  }, []);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* === Bagian Mood & Prioritas === */}
      <div className="space-y-2">
        <p><strong>Mood hari ini:</strong> {mood || "Belum diatur"}</p>
        <p><strong>Energi:</strong> {energy !== null ? energy : "Belum diatur"}</p>
        <p><strong>Prioritas utama:</strong> {prioritas || "Belum ada tugas prioritas"}</p>
      </div>

      {/* === Produktivitas === */}
      <div className="border-t pt-4">
        <h2 className="text-lg font-semibold mb-2">Ringkasan Produktivitas</h2>
        <p>Total Tugas: {ringkasan.totalTugas}</p>
        <p>Tugas Selesai: {ringkasan.selesai}</p>
        <p>Produktivitas: {ringkasan.produktivitas}%</p>

        {/* Progress bar produktivitas */}
        <div className="w-full bg-gray-200 rounded-full h-3 mt-2 overflow-hidden">
          <div
            className={`h-3 transition-all duration-500 ${
              ringkasan.produktivitas < 40
                ? "bg-red-500"
                : ringkasan.produktivitas < 70
                ? "bg-yellow-400"
                : "bg-green-500"
            }`}
            style={{ width: `${ringkasan.produktivitas}%` }}
          ></div>
        </div>
      </div>

      {/* === Keuangan Hari Ini === */}
      <div className="border-t pt-4">
        <h2 className="text-lg font-semibold mb-2">Keuangan Hari Ini</h2>
        <p><strong>Pemasukan:</strong> Rp {finance.pemasukan.toLocaleString("id-ID")}</p>
        <p><strong>Pengeluaran:</strong> Rp {finance.pengeluaran.toLocaleString("id-ID")}</p>
        <p><strong>Saldo Hari Ini:</strong> Rp {finance.saldo.toLocaleString("id-ID")}</p>

        {/* Progress saldo visual */}
        <div className="w-full bg-gray-200 rounded-full h-3 mt-2 overflow-hidden">
          <div
            className={`h-3 transition-all duration-500 ${
              finance.saldo < 0
                ? "bg-red-500"
                : finance.saldo === 0
                ? "bg-gray-400"
                : "bg-green-500"
            }`}
            style={{
              width: `${Math.min(
                Math.abs(finance.saldo) /
                  Math.max(finance.pemasukan || 1, finance.pengeluaran || 1) *
                  100,
                100
              )}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
