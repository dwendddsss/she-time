"use client";
import { useState, useEffect } from "react";

const TASKS_STORAGE_KEY = "daily_tasks";
const FINANCE_STORAGE_KEY = "finance_records";

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
    // === Muat Tugas ===
    const savedTasks = localStorage.getItem(TASKS_STORAGE_KEY);
    let allTasks = [];
    if (savedTasks) {
      try {
        const parsed = JSON.parse(savedTasks);
        allTasks = [
          ...(parsed.pribadi || []),
          ...(parsed.rumah || []),
          ...(parsed.bisnis || []),
        ];
      } catch (err) {
        console.error("Gagal memuat tugas:", err);
      }
    }

    // === Hitung Tugas Prioritas, Produktivitas ===
    const starred = allTasks.find((t) => t.isFavorite);
    setPrioritas(starred ? starred.text : null);

    const total = allTasks.length;
    const selesai = allTasks.filter((t) => t.completed).length;
    const produktivitas = total > 0 ? Math.round((selesai / total) * 100) : 0;

    setRingkasan({ totalTugas: total, selesai, produktivitas });

    // === Muat Keuangan ===
    const savedFinance = localStorage.getItem(FINANCE_STORAGE_KEY);
    if (savedFinance) {
      try {
        const parsedFinance = JSON.parse(savedFinance);
        const records = parsedFinance.records || [];

        // Gunakan tanggal lokal (id-ID) sesuai di tugas
        const today = new Date().toLocaleDateString("id-ID");

        const todayRecords = records.filter((r) => r.date === today);

        const totalIncome = todayRecords
          .filter((r) => r.type === "income")
          .reduce((sum, r) => sum + Number(r.amount || 0), 0);

        const totalExpense = todayRecords
          .filter((r) => r.type === "expense")
          .reduce((sum, r) => sum + Number(r.amount || 0), 0);

        const saldo = totalIncome - totalExpense;

        setFinance({
          pemasukan: totalIncome,
          pengeluaran: totalExpense,
          saldo,
        });
      } catch (err) {
        console.error("Gagal memuat data keuangan:", err);
      }
    }

    // === Mood & Energi (opsional, kalau kamu pakai di tempat lain) ===
    const savedMood = localStorage.getItem("mood");
    const savedEnergy = localStorage.getItem("energy");
    setMood(savedMood || null);
    setEnergy(savedEnergy || null);
  }, []);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* === Bagian Mood & Prioritas === */}
      <div className="space-y-2">
        <p><strong>Mood hari ini:</strong> {mood || "Belum diatur"}</p>
        <p><strong>Energi:</strong> {energy || "Belum diatur"}</p>
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
