"use client";

import { useState, useEffect, useMemo } from "react";
import { useTimer } from "../lib/TimerContext";
import {
  Clock,
  ListTodo,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Wallet,
  Star,
  Smile,
  Zap,
  Heart,
} from "lucide-react";

export default function Dashboard() {
  const { totalSessions } = useTimer();

  const [taskSummary, setTaskSummary] = useState({
    total: 0,
    completed: 0,
    favorites: [],
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
        const favorites = allTasks
          .filter((t) => t.isFavorite)
          .map((t) => t.text);

        setTaskSummary({
          total: allTasks.length,
          completed,
          favorites,
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

  // === Pesan Motivasi (tanpa emotikon) ===
  const getMessage = () => {
    if (moodScore >= 80) {
      return { 
        title: "Kamu Bersinar Hari Ini", 
        msg: "Energi dan fokusmu luar biasa. Nikmati setiap momen yang kamu capai." 
      };
    } else if (moodScore >= 60) {
      return { 
        title: "Kamu Sudah Melangkah Jauh", 
        msg: "Mungkin belum sempurna, tapi kamu terus maju — dan itu luar biasa." 
      };
    } else if (moodScore >= 40) {
      return { 
        title: "Pelan Tapi Pasti", 
        msg: "Kamu sedang belajar menyeimbangkan diri. Setiap langkah kecil tetap berarti." 
      };
    } else {
      return { 
        title: "Tidak Apa-Apa", 
        msg: "Hari ini mungkin terasa berat, tapi kamu tetap berharga. Istirahatlah, besok akan lebih baik." 
      };
    }
  };
  const { title, msg } = getMessage();

  // === Format Rupiah ===
  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 bg-[#FFF9FB] min-h-screen">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[#E91E63]">
          Dashboard
        </h1>
        <p className="text-[#AD1457] mt-2 text-sm max-w-md mx-auto">
          Lihat perjalanan harianmu di satu tempat — tenang, rapi, dan selalu dalam kendali.
        </p>
      </div>

      {/* Pesan Motivasi */}
      <div className="p-6 rounded-xl bg-white border border-[#F8BBD0] shadow-sm mb-8">
        <div className="flex items-start gap-4 mb-3">
          <div className="p-2 bg-[#FCE4EC] rounded-lg text-[#E91E63]">
            <Smile className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#C2185B]">{title}</h2>
            <p className="text-[#AD1457] mt-1">{msg}</p>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <span className="text-sm text-[#AD1457]">Skor Mood:</span>
          <span className="font-bold bg-[#FCE4EC] px-3 py-1 rounded-lg text-[#E91E63]">
            {moodScore}/100
          </span>
        </div>
      </div>

      {/* Skor: Energi, Produktivitas, Mood */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <ScoreCard title="Energi" score={energyScore} color="#FCE4EC" barColor="#E91E63" />
        <ScoreCard title="Produktivitas" score={productivityScore} color="#FCE4EC" barColor="#E91E63" />
        <ScoreCard title="Mood" score={moodScore} color="#FCE4EC" barColor="#E91E63" />
      </div>

      {/* Statistik Utama */}
      <div className="space-y-4 mb-8">
        {/* Baris 1: Tugas & Fokus */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatBox
            title="Waktu Fokusmu"
            value={totalSessions}
            icon={<Clock className="w-6 h-6 text-[#E91E63]" />}
            color="#FFFFFF"
          />
          <StatBox
            title="Semua Tugasmu"
            value={taskSummary.total}
            icon={<ListTodo className="w-6 h-6 text-[#E91E63]" />}
            color="#FFFFFF"
          />
          <StatBox
            title="Tugas yang Terselesaikan"
            value={taskSummary.total ? `${taskSummary.completed}/${taskSummary.total}` : "0"}
            icon={<CheckCircle className="w-6 h-6 text-[#E91E63]" />}
            color="#FFFFFF"
          />
        </div>

        {/* Baris 2: Keuangan */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatBox
            title="Uang Masuk"
            value={formatRupiah(financeSummary.income)}
            icon={<TrendingUp className="w-6 h-6 text-green-600" />}
            color="#FFFFFF"
          />
          <StatBox
            title="Uang Keluar"
            value={formatRupiah(financeSummary.expense)}
            icon={<TrendingDown className="w-6 h-6 text-red-600" />}
            color="#FFFFFF"
          />
          <StatBox
            title="Saldo"
            value={formatRupiah(financeSummary.saldo)}
            icon={<Wallet className="w-6 h-6 text-[#E91E63]" />}
            color="#FFFFFF"
          />
        </div>

        {/* Baris 3: Prioritas */}
        <div className="grid grid-cols-1">
          <StatBoxLongList
            title="Prioritas"
            items={taskSummary.favorites.length > 0 ? taskSummary.favorites : ["Belum ada favorit"]}
            icon={<Star className="w-6 h-6 text-[#E91E63]" />}
            color="#FFFFFF"
          />
        </div>
      </div>

      {/* Mood & Energi (input manual, opsional) */}
      {(mood || energyInput !== null) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {mood && (
            <div className="bg-white p-5 rounded-xl border border-[#F8BBD0] shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Smile className="w-5 h-5 text-[#E91E63]" />
                <h3 className="text-sm font-semibold text-[#C2185B]">Mood Hari Ini</h3>
              </div>
              <div className="text-xl font-medium text-[#AD1457]">{mood}</div>
            </div>
          )}
          {energyInput !== null && (
            <div className="bg-white p-5 rounded-xl border border-[#F8BBD0] shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-5 h-5 text-[#E91E63]" />
                <h3 className="text-sm font-semibold text-[#C2185B]">Energi</h3>
              </div>
              <div className="mt-2 flex items-center gap-3">
                <div className="w-full bg-[#F8BBD0] rounded-full h-2">
                  <div
                    className="h-2 bg-[#E91E63] rounded-full"
                    style={{ width: `${(energyInput / 10) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-[#AD1457] w-10">{energyInput}/10</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// === Komponen ScoreCard ===
function ScoreCard({ title, score, color, barColor }) {
  return (
    <div className="bg-white p-5 rounded-xl border border-[#F8BBD0] shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <span className="font-semibold text-[#C2185B]">{title}</span>
        <span className="font-bold text-[#C2185B]">{score}</span>
      </div>
      <div className="w-full bg-[#F8BBD0] rounded-full h-2">
        <div
          className="h-2 rounded-full"
          style={{ width: `${score}%`, backgroundColor: barColor }}
        ></div>
      </div>
    </div>
  );
}

// === Komponen StatBox ===
function StatBox({ title, value, icon, color }) {
  return (
    <div className={`bg-${color} p-4 rounded-xl border border-[#F8BBD0] shadow-sm flex items-center`}>
      <div className="p-2 bg-[#FCE4EC] rounded-lg mr-3">{icon}</div>
      <div className="min-w-0">
        <div className="text-xs text-[#AD1457]">{title}</div>
        <div className="text-lg font-bold text-[#C2185B] mt-1 truncate">{value}</div>
      </div>
    </div>
  );
}

// === Komponen untuk daftar prioritas ===
function StatBoxLongList({ title, items, icon, color }) {
  return (
    <div className={`bg-${color} p-4 rounded-xl border border-[#F8BBD0] shadow-sm`}>
      <div className="flex items-start mb-3">
        <div className="p-2 bg-[#FCE4EC] rounded-lg mr-3 mt-0.5">{icon}</div>
        <div>
          <div className="text-xs text-[#AD1457]">{title}</div>
        </div>
      </div>
      <ul className="list-disc pl-5 space-y-1 text-[#AD1457]">
        {items.map((item, idx) => (
          <li key={idx} className="text-sm font-medium truncate">{item}</li>
        ))}
      </ul>
    </div>
  );
}