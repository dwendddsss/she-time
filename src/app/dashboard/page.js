'use client';

import { useState, useEffect, useMemo } from 'react';
import { useTimer } from '../lib/TimerContext';

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
    // --- Mood & Energi (opsional) ---
    const savedMood = localStorage.getItem('mood');
    const savedEnergy = localStorage.getItem('energy');
    setMood(savedMood || null);
    setEnergyInput(savedEnergy ? parseInt(savedEnergy, 10) : null);

    // --- Tugas ---
    const tasksStr = localStorage.getItem('daily_tasks');
    if (tasksStr) {
      try {
        const tasks = JSON.parse(tasksStr);
        const allTasks = [
          ...(tasks.pribadi || []),
          ...(tasks.rumah || []),
          ...(tasks.bisnis || []),
        ];
        const completed = allTasks.filter(t => t.completed).length;
        const priority = allTasks.find(t => t.isFavorite)?.text || null;

        setTaskSummary({
          total: allTasks.length,
          completed,
          priority,
        });
      } catch (e) {
        console.error("Gagal muat tugas:", e);
      }
    }

    // --- Keuangan ---
    const financeStr = localStorage.getItem('finance_records');
    if (financeStr) {
      try {
        const { records = [] } = JSON.parse(financeStr);
        const income = records
          .filter(r => r.type === 'income')
          .reduce((sum, r) => sum + r.amount, 0);
        const expense = records
          .filter(r => r.type === 'expense')
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
    return Math.min(100, totalSessions * 10);
  }, [totalSessions]);

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
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(angka);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">✨ SheTime Dashboard</h1>

      {/* Statistik Utama */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <StatBox title="Sesi Pomodoro" value={totalSessions} icon="🍅" color="bg-amber-50" />
        <StatBox title="Total Tugas" value={taskSummary.total} icon="📋" color="bg-blue-50" />
        <StatBox 
          title="Selesai" 
          value={taskSummary.total ? `${taskSummary.completed}/${taskSummary.total}` : "0"} 
          icon="✅" 
          color="bg-emerald-50" 
        />
        <StatBox 
          title="Prioritas" 
          value={taskSummary.priority || "–"} 
          icon="⭐" 
          color="bg-pink-50" 
        />
        <StatBox 
          title="Saldo" 
          value={formatRupiah(financeSummary.saldo)} 
          icon="💰" 
          color={financeSummary.saldo >= 0 ? "bg-green-50" : "bg-red-50"}
        />
      </div>

      {/* Keuangan Detail */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-green-50 p-4 rounded-xl border border-green-200">
          <h3 className="text-sm font-medium text-green-700">Pemasukan</h3>
          <div className="text-lg font-bold text-green-800 mt-1">
            {formatRupiah(financeSummary.income)}
          </div>
        </div>
        <div className="bg-red-50 p-4 rounded-xl border border-red-200">
          <h3 className="text-sm font-medium text-red-700">Pengeluaran</h3>
          <div className="text-lg font-bold text-red-800 mt-1">
            {formatRupiah(financeSummary.expense)}
          </div>
        </div>
      </div>

      {/* Mood & Energi (jika ada) */}
      {(mood || energyInput !== null) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {mood && (
            <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
              <h3 className="text-sm font-medium text-purple-700">Mood Hari Ini</h3>
              <div className="text-3xl mt-1">{mood}</div>
            </div>
          )}
          {energyInput !== null && (
            <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
              <h3 className="text-sm font-medium text-yellow-700">Energi</h3>
              <div className="mt-2 flex items-center gap-2">
                <span>⚡</span>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-yellow-500 h-2 rounded-full" 
                    style={{ width: `${(energyInput / 10) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm w-8">{energyInput}/10</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Skor */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <ScoreCard title="Energi" score={energyScore} color="from-purple-400 to-purple-600" />
        <ScoreCard title="Produktivitas" score={productivityScore} color="from-green-400 to-green-600" />
        <ScoreCard title="Mood" score={moodScore} color="from-pink-400 to-pink-600" />
      </div>

      {/* Pesan Motivasi */}
      <div className="p-5 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl border border-indigo-200">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">{emoji}</span>
          <h2 className="font-bold text-slate-800">{title}</h2>
        </div>
        <p className="text-slate-700 text-sm">{msg}</p>
        <div className="mt-2 text-xs text-slate-600">
          Skor Mood: <span className="font-bold">{moodScore}/100</span>
        </div>
      </div>
    </div>
  );
}

function StatBox({ title, value, icon, color }) {
  return (
    <div className={`${color} p-4 rounded-xl border flex items-center`}>
      <span className="text-xl mr-3">{icon}</span>
      <div>
        <div className="text-xs text-slate-600">{title}</div>
        <div className="text-lg font-bold text-slate-800 mt-1">{value}</div>
      </div>
    </div>
  );
}

function ScoreCard({ title, score, color }) {
  return (
    <div className="bg-white p-4 rounded-xl border">
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium text-slate-800">{title}</span>
        <span className="font-bold text-slate-800">{score}</span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full bg-gradient-to-r ${color}`} 
          style={{ width: `${score}%` }}
        ></div>
      </div>
    </div>
  );
}