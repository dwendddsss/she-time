"use client";
import { useState, useEffect } from "react";
import {
  User,
  Home,
  Briefcase,
  Wallet,
  Check,
  Star,
  Trash2,
  Plus,
  Minus,
} from "lucide-react";

const TASKS_STORAGE_KEY = "daily_tasks";
const FINANCE_STORAGE_KEY = "finance_records";

// Default tugas awal (hanya digunakan jika belum ada data tersimpan)
const DEFAULT_TASKS = {
  pribadi: [{ id: 1, text: "Olahraga", isFavorite: false, completed: false }],
  rumah: [{ id: 2, text: "Masak", isFavorite: false, completed: false }],
  bisnis: [{ id: 3, text: "Kirim pesanan", isFavorite: true, completed: false }],
};

const DEFAULT_FINANCE = {
  income: "",
  expense: "",
  records: [],
};

export default function Tasks() {
  const [tasks, setTasks] = useState(DEFAULT_TASKS);
  const [newTask, setNewTask] = useState({
    pribadi: "",
    rumah: "",
    bisnis: "",
  });
  const [finance, setFinance] = useState(DEFAULT_FINANCE);

  // === Muat data dari localStorage saat pertama kali ===
  useEffect(() => {
    // Muat tugas
    const savedTasks = localStorage.getItem(TASKS_STORAGE_KEY);
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
      } catch (e) {
        console.error("Gagal memuat tugas dari localStorage", e);
        // Opsional: reset ke default jika error
        localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(DEFAULT_TASKS));
      }
    } else {
      // Simpan default ke localStorage jika belum ada
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(DEFAULT_TASKS));
    }

    // Muat keuangan
    const savedFinance = localStorage.getItem(FINANCE_STORAGE_KEY);
    if (savedFinance) {
      try {
        const parsed = JSON.parse(savedFinance);
        setFinance({
          income: "",
          expense: "",
          records: parsed.records || [],
        });
      } catch (e) {
        console.error("Gagal memuat keuangan dari localStorage", e);
        localStorage.setItem(FINANCE_STORAGE_KEY, JSON.stringify({ records: [] }));
      }
    } else {
      localStorage.setItem(FINANCE_STORAGE_KEY, JSON.stringify({ records: [] }));
    }
  }, []);

  // === Helper: Simpan tugas ke localStorage ===
  const saveTasksToStorage = (updatedTasks) => {
    try {
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(updatedTasks));
    } catch (e) {
      console.error("Gagal menyimpan tugas ke localStorage", e);
    }
  };

  // === Helper: Simpan keuangan ke localStorage ===
  const saveFinanceToStorage = (records) => {
    try {
      localStorage.setItem(FINANCE_STORAGE_KEY, JSON.stringify({ records }));
    } catch (e) {
      console.error("Gagal menyimpan keuangan ke localStorage", e);
    }
  };

  // === Operasi Tugas ===
  const addTask = (category) => {
    if (!newTask[category]?.trim()) return;
    const newEntry = {
      id: Date.now(),
      text: newTask[category],
      isFavorite: false,
      completed: false,
    };

    setTasks((prev) => {
      const updated = {
        ...prev,
        [category]: [...(prev[category] || []), newEntry],
      };
      saveTasksToStorage(updated);
      return updated;
    });

    setNewTask((prev) => ({ ...prev, [category]: "" }));
  };

  const deleteTask = (category, id) => {
    setTasks((prev) => {
      const updated = {
        ...prev,
        [category]: (prev[category] || []).filter((task) => task.id !== id),
      };
      saveTasksToStorage(updated);
      return updated;
    });
  };

  const toggleFavorite = (category, id) => {
    setTasks((prev) => {
      const updated = {
        ...prev,
        [category]: (prev[category] || []).map((task) =>
          task.id === id ? { ...task, isFavorite: !task.isFavorite } : task
        ),
      };
      saveTasksToStorage(updated);
      return updated;
    });
  };

  const toggleCompleted = (category, id) => {
    setTasks((prev) => {
      const updated = {
        ...prev,
        [category]: (prev[category] || []).map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        ),
      };
      saveTasksToStorage(updated);
      return updated;
    });
  };

  // === Operasi Keuangan ===
  const addFinanceRecord = (type) => {
    const amountStr = type === "income" ? finance.income : finance.expense;
    const amount = parseFloat(amountStr);
    if (isNaN(amount) || amount <= 0) {
      alert("Masukkan jumlah yang valid!");
      return;
    }

    const newRecord = {
      id: Date.now(),
      type,
      amount,
      date: new Date().toLocaleDateString("id-ID"),
    };

    setFinance((prev) => {
      const updatedRecords = [...prev.records, newRecord];
      saveFinanceToStorage(updatedRecords);
      return {
        ...prev,
        records: updatedRecords,
        income: type === "income" ? "" : prev.income,
        expense: type === "expense" ? "" : prev.expense,
      };
    });
  };

  const deleteFinanceRecord = (id) => {
    setFinance((prev) => {
      const updatedRecords = prev.records.filter((rec) => rec.id !== id);
      saveFinanceToStorage(updatedRecords);
      return {
        ...prev,
        records: updatedRecords,
      };
    });
  };

  // === Hitung saldo ===
  const totalIncome = finance.records
    .filter((r) => r.type === "income")
    .reduce((sum, r) => sum + r.amount, 0);
  const totalExpense = finance.records
    .filter((r) => r.type === "expense")
    .reduce((sum, r) => sum + r.amount, 0);
  const saldo = totalIncome - totalExpense;

  // === Kategori ===
  const categories = [
    {
      key: "pribadi",
      title: "Pribadi",
      icon: <User className="w-4 h-4" />,
      inputPlaceholder: "Olahraga, baca buku...",
    },
    {
      key: "rumah",
      title: "Rumah Tangga",
      icon: <Home className="w-4 h-4" />,
      inputPlaceholder: "Masak, bersih-bersih...",
    },
    {
      key: "bisnis",
      title: "Bisnis",
      icon: <Briefcase className="w-4 h-4" />,
      inputPlaceholder: "Follow up klien...",
    },
  ];

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto bg-[#FFF9FB] min-h-screen">
      <h2 className="text-2xl font-bold text-[#E91E63] mb-6 text-center">
        Tugas Harian & Keuangan
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.key}
            className="bg-white rounded-xl p-5 border border-[#F8BBD0] shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="text-lg font-bold flex items-center gap-2 mb-3 text-[#C2185B]">
              {cat.icon}
              <span>{cat.title}</span>
            </h3>
            <input
              type="text"
              placeholder={cat.inputPlaceholder}
              value={newTask[cat.key] || ""}
              onChange={(e) =>
                setNewTask((prev) => ({ ...prev, [cat.key]: e.target.value }))
              }
              className="w-full p-2.5 bg-white border border-[#F8BBD0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E91E63] mb-3 text-sm"
            />
            <button
              onClick={() => addTask(cat.key)}
              className="w-full bg-[#E91E63] text-white py-2 rounded-lg hover:bg-[#C2185B] font-medium transition-colors flex items-center justify-center gap-1.5"
            >
              <Plus size={16} />
              Tambah Tugas
            </button>

            <div className="mt-4 space-y-2">
              {(tasks[cat.key] || []).map((task) => (
                <div
                  key={task.id}
                  className={`flex items-center justify-between p-2.5 rounded-lg border ${
                    task.completed
                      ? "bg-[#F0FDF4] border-[#BBF7D0]"
                      : "bg-white border-[#F8BBD0]"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleCompleted(cat.key, task.id)}
                      className={`p-1 rounded-full border ${
                        task.completed
                          ? "bg-[#10B981] border-[#10B981] text-white"
                          : "border-[#D1D5DB] hover:border-[#10B981]"
                      }`}
                    >
                      {task.completed && <Check size={12} />}
                    </button>
                    <span
                      className={`text-sm ${
                        task.completed ? "line-through text-[#9CA3AF]" : ""
                      }`}
                    >
                      {task.text}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleFavorite(cat.key, task.id)}
                      className={`transition-colors ${
                        task.isFavorite ? "text-[#F59E0B]" : "text-[#D1D5DB] hover:text-[#F59E0B]"
                      }`}
                    >
                      <Star size={14} className={task.isFavorite ? "fill-[#F59E0B]" : ""} />
                    </button>
                    <button
                      onClick={() => deleteTask(cat.key, task.id)}
                      className="text-[#EF4444] hover:text-[#B91C1C] transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Keuangan */}
        <div className="bg-white rounded-xl p-5 border border-[#F8BBD0] shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-lg font-bold flex items-center gap-2 mb-3 text-[#C2185B]">
            <Wallet className="w-4 h-4" />
            <span>Keuangan</span>
          </h3>

          <div className="flex items-center gap-2 mb-3">
            <input
              type="number"
              placeholder="Pemasukan"
              value={finance.income}
              onChange={(e) => setFinance({ ...finance, income: e.target.value })}
              className="w-full p-2.5 bg-white border border-[#F8BBD0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E91E63] text-sm"
            />
            <button
              onClick={() => addFinanceRecord("income")}
              className="p-2.5 bg-[#10B981] text-white rounded-lg hover:bg-[#059669] transition-colors"
              title="Tambah Pemasukan"
            >
              <Plus size={16} />
            </button>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <input
              type="number"
              placeholder="Pengeluaran"
              value={finance.expense}
              onChange={(e) => setFinance({ ...finance, expense: e.target.value })}
              className="w-full p-2.5 bg-white border border-[#F8BBD0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E91E63] text-sm"
            />
            <button
              onClick={() => addFinanceRecord("expense")}
              className="p-2.5 bg-[#EF4444] text-white rounded-lg hover:bg-[#DC2626] transition-colors"
              title="Tambah Pengeluaran"
            >
              <Minus size={16} />
            </button>
          </div>

          {/* Ringkasan Saldo */}
          <div className="bg-[#FCE4EC] p-3 rounded-lg border border-[#F8BBD0]">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-[#AD1457]">Pemasukan:</span>
              <span className="text-[#10B981] font-semibold">
                Rp{totalIncome.toLocaleString("id-ID")}
              </span>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-[#AD1457]">Pengeluaran:</span>
              <span className="text-[#EF4444] font-semibold">
                Rp{totalExpense.toLocaleString("id-ID")}
              </span>
            </div>
            <div className="flex justify-between font-bold pt-2 border-t border-[#F8BBD0] mt-1">
              <span className="text-[#C2185B]">Saldo:</span>
              <span className={saldo >= 0 ? "text-[#10B981]" : "text-[#EF4444]"}>
                Rp{saldo.toLocaleString("id-ID")}
              </span>
            </div>
          </div>

          {/* Riwayat */}
          {finance.records.length > 0 && (
            <div className="mt-4 text-xs space-y-1.5 max-h-28 overflow-y-auto pr-1">
              <h4 className="font-semibold text-[#C2185B] mb-1">Riwayat Transaksi:</h4>
              {finance.records.map((rec) => (
                <div
                  key={rec.id}
                  className="flex justify-between items-center py-1.5 px-2 bg-white rounded border border-[#F8BBD0]"
                >
                  <span className={rec.type === "income" ? "text-[#10B981]" : "text-[#EF4444]"}>
                    {rec.type === "income" ? "Pemasukan" : "Pengeluaran"}{" "}
                    Rp{rec.amount.toLocaleString("id-ID")}
                  </span>
                  <button
                    onClick={() => deleteFinanceRecord(rec.id)}
                    className="text-[#9CA3AF] hover:text-[#EF4444] transition-colors"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}