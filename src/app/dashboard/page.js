"use client";

import { useState, useEffect, useMemo } from "react";
import { useTimer } from "../lib/TimerContext";

export default function Dashboard() {
  const { totalSessions } = useTimer();

  const [taskSummary, setTaskSummary] = useState({
    total: 0,
    completed: 0,
    priority: null,
  });

  const [financeSummary, setFinanceSummary] = useState({
    income: 0,
    expense: 0,
    saldo: 0,
  });

  const [mood, setMood] = useState(null);
  const [energyInput, setEnergyInput] = useState(null);

  // === Muat data dari localStorage ===
  useEffect(() => {
    const savedMood = localStorage.getItem("mood");
    const savedEnergy = localStorage.getItem("energy");
    setMood(savedMood || null);
    setEnergyInput(savedEnergy ? parseInt(savedEnergy, 10) : null);

    const tasksStr = localStorage.getItem("daily_tasks");
    if (tasksStr) {
      try {
        const tasks = JSON.parse(tasksStr);
        const allTasks = [
          ...(tasks.pribadi || []),
          ...(tasks.rumah || []),
          ...(tasks.bisnis || []),
        ];
        const completed = allTasks.filter((t) => t.completed).length;
        const priority = allTasks.find((t) => t.isFavorite)?.text || null;

        setTaskSummary({
          total: allTasks.length,
          completed,
          priority,
        });
      } catch (e) {
        console.error("Gagal muat tugas:", e);
      }
    }

    const financeStr = localStorage.getItem("finance_records");
    if (financeStr) {
      try {
        const { records = [] } = JSON.parse(financeStr);
        const income = records
          .filter((r) => r.type === "income")
          .reduce((sum, r) => sum + r.amount, 0);
        const expense = records
          .filter((r) => r.type === "expense")
          .reduce((sum, r) => sum + r.amount, 0);
        const saldo = income - expense;

        setFinanceSummary({ income, expense, saldo });
      } catch (e) {
        console.error("Gagal muat keuangan:", e);
      }
    }
  }, []);

  // === Hitung Skor ===
  const productivityScore = taskSummary.total > 0
    ? Math.round((taskSummary.completed / taskSummary.total) * 100)
    : 0;

  const energyScore = useMemo(() => {
    const usedByPomodoro = totalSessions * 10;
    const usedByTasks = taskSummary.completed * 5;
    return Math.max(0, 100 - usedByPomodoro - usedByTasks);
  }, [totalSessions, taskSummary.completed]);

  const moodScore = useMemo(() => {
    return Math.round(0.6 * productivityScore + 0.4 * energyScore);
  }, [productivityScore, energyScore]);

  // === Pesan Motivasi ===
  const getMessage = () => {
    if (moodScore >= 80) {
      return { title: "Luar Biasa! 🌟", msg: "Kamu sangat produktif hari ini!", emoji: "🎉" };
    } else if (moodScore >= 60) {
      return { title: "Bagus Sekali! 👏", msg: "Kamu sudah melakukan hal-hal hebat!", emoji: "💪" };
    } else if (moodScore >= 40) {
      return { title: "Lumayan! 🌱", msg: "Masih ada ruang untuk berkembang.", emoji: "✨" };
    } else {
      return { title: "Ayo Bangkit! 🌈", msg: "Hari ini mungkin berat, tapi besok adalah kesempatan baru.", emoji: "❤️" };
    }
  };

  const { title, msg, emoji } = getMessage();

  // === Format Rupiah ===
  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Header dengan gradien */}
     <div className="text-center mb-8">
      <h1 className="text-3xl md:text-4xl font-bold text-pink-600">
        Dashboard
      </h1>
      <p className="text-gray-600 mt-2 text-sm max-w-md mx-auto">
        Pantau progres harianmu dalam satu tampilan terintegrasi — sederhana, jelas, dan selalu up-to-date.
      </p>
      </div>

      {/* Statistik Utama - Kartu Warna-Warni */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        <StatBox
          title="Sesi Fokus"
          value={totalSessions}
          icon="🍅"
          color="from-amber-400 to-orange-400"
        />
        <StatBox
          title="Total Tugas"
          value={taskSummary.total}
          icon="📋"
          color="from-blue-400 to-cyan-400"
        />
        <StatBox
          title="Selesai"
          value={taskSummary.total ? `${taskSummary.completed}/${taskSummary.total}` : "0"}
          icon="✅"
          color="from-emerald-400 to-teal-400"
        />
        <StatBox
          title="Prioritas"
          value={taskSummary.priority || "–"}
          icon="⭐"
          color="from-pink-400 to-rose-400"
        />
        <StatBox
          title="Saldo"
          value={formatRupiah(financeSummary.saldo)}
          icon="💰"
          color={financeSummary.saldo >= 0 ? "from-green-400 to-emerald-400" : "from-red-400 to-rose-400"}
        />
      </div>

      {/* Keuangan Detail - Gradien */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-2xl border border-green-200 shadow-sm">
          <h3 className="text-sm font-semibold text-green-700 flex items-center gap-1">
            📈 Pemasukan
          </h3>
          <div className="text-xl font-bold text-green-800 mt-2">
            {formatRupiah(financeSummary.income)}
          </div>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-rose-50 p-5 rounded-2xl border border-red-200 shadow-sm">
          <h3 className="text-sm font-semibold text-red-700 flex items-center gap-1">
            📉 Pengeluaran
          </h3>
          <div className="text-xl font-bold text-red-800 mt-2">
            {formatRupiah(financeSummary.expense)}
          </div>
        </div>
      </div>

      {/* Mood & Energi */}
      {(mood || energyInput !== null) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {mood && (
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-5 rounded-2xl border border-purple-200 shadow-sm">
              <h3 className="text-sm font-semibold text-purple-700">Mood Hari Ini</h3>
              <div className="text-3xl mt-2">{mood}</div>
            </div>
          )}
          {energyInput !== null && (
            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-5 rounded-2xl border border-yellow-200 shadow-sm">
              <h3 className="text-sm font-semibold text-yellow-700 flex items-center gap-1">
                ⚡ Energi
              </h3>
              <div className="mt-3 flex items-center gap-3">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-gradient-to-r from-yellow-400 to-amber-500 h-2.5 rounded-full"
                    style={{ width: `${(energyInput / 10) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium w-10">{energyInput}/10</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Skor dengan Gradien */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <ScoreCard title="Energi" score={energyScore} color="from-purple-400 to-indigo-500" />
        <ScoreCard title="Produktivitas" score={productivityScore} color="from-green-400 to-emerald-500" />
        <ScoreCard title="Mood" score={moodScore} color="from-pink-400 to-rose-500" />
      </div>

      {/* Pesan Motivasi - Kartu Gradien */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border border-white/50 shadow-lg">
        <div className="flex items-center gap-4 mb-3">
          <span className="text-3xl">{emoji}</span>
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        </div>
        <p className="text-gray-700">{msg}</p>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-sm text-gray-600">Skor Mood:</span>
          <span className="font-bold bg-white/60 px-2.5 py-0.5 rounded-full text-pink-600">
            {moodScore}/100
          </span>
        </div>
      </div>
    </div>
  );
}

// === Komponen StatBox ===
function StatBox({ title, value, icon, color }) {
  return (
    <div className={`bg-gradient-to-br ${color} p-4 rounded-2xl text-white shadow-sm flex items-center`}>
      <span className="text-2xl mr-3">{icon}</span>
      <div>
        <div className="text-xs opacity-90">{title}</div>
        <div className="text-lg font-bold mt-1">{value}</div>
      </div>
    </div>
  );
}

// === Komponen ScoreCard ===
function ScoreCard({ title, score, color }) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <span className="font-semibold text-gray-800">{title}</span>
        <span className="font-bold text-gray-800">{score}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full bg-gradient-to-r ${color}`}
          style={{ width: `${score}%` }}
        ></div>
      </div>
    </div>
  );
}