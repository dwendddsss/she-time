'use client';
import { useState, useEffect } from 'react';
import { FaTrash, FaStar, FaCheck } from 'react-icons/fa';

const TASKS_STORAGE_KEY = "daily_tasks";
const FINANCE_STORAGE_KEY = "finance_records";

export default function Tasks() {
  // === State Awal Default ===
  const initialFinance = {
    income: "",
    expense: "",
    records: [],
  };

  // === State ===
  const [tasks, setTasks] = useState({
    pribadi: [{ id: 1, text: "Olahraga", isFavorite: false, completed: false }],
    rumah: [{ id: 2, text: "Masak", isFavorite: false, completed: false }],
    bisnis: [{ id: 3, text: "Kirim pesanan", isFavorite: true, completed: false }],
  });
  const [newTask, setNewTask] = useState({
    pribadi: "",
    rumah: "",
    bisnis: "",
  });
  const [finance, setFinance] = useState(initialFinance);

  
  useEffect(() => {

    const savedTasks = localStorage.getItem(TASKS_STORAGE_KEY);
    if (savedTasks) {
      try {
         setTasks(JSON.parse(savedTasks));
      } catch (e) {
        console.error("Gagal memuat tugas dari localStorage", e);
      }
  }

    
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
    }
  }
}, []);


 
  const addTask = (category) => {
    if (!newTask[category].trim()) return;
    const newEntry = {
      id: Date.now(),
      text: newTask[category],
      isFavorite: false,
      completed: false, 
    };
    setTasks({ ...tasks, [category]: [...tasks[category], newEntry] });
    setNewTask({ ...newTask, [category]: "" });
  };

  const deleteTask = (category, id) => {
    setTasks({ ...tasks, [category]: tasks[category].filter((task) => task.id !== id) });
  };

  const toggleFavorite = (category, id) => {
  setTasks(prev => {
    const updated = {
      ...prev,
      [category]: prev[category].map(task =>
        task.id === id ? { ...task, isFavorite: !task.isFavorite } : task
      ),
    };
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  });
};

 const toggleCompleted = (category, id) => {
  setTasks(prev => {
    const updated = {
      ...prev,
      [category]: prev[category].map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ),
    };
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  });
};

  // --- Fungsi Keuangan ------
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

  setFinance(prev => {
    const updatedRecords = [...prev.records, newRecord];
    const updatedFinance = {
      ...prev,
      records: updatedRecords,
      income: type === "income" ? "" : prev.income,
      expense: type === "expense" ? "" : prev.expense,
    };
    // 🔥 Simpan ke localStorage
    localStorage.setItem(FINANCE_STORAGE_KEY, JSON.stringify({ records: updatedRecords }));
    return updatedFinance;
  });
};

const deleteFinanceRecord = (id) => {
  setFinance(prev => {
    const updatedRecords = prev.records.filter((rec) => rec.id !== id);
    // 🔥 Simpan ke localStorage
    localStorage.setItem(FINANCE_STORAGE_KEY, JSON.stringify({ records: updatedRecords }));
    return {
      ...prev,
      records: updatedRecords,
    };
  });
};

  const totalIncome = finance.records
    .filter((r) => r.type === "income")
    .reduce((sum, r) => sum + r.amount, 0);
  const totalExpense = finance.records
    .filter((r) => r.type === "expense")
    .reduce((sum, r) => sum + r.amount, 0);
  const saldo = totalIncome - totalExpense;

  // Warna latar per kategori
  const categoryStyles = {
    pribadi: { bg: "bg-pink-50", border: "border-pink-200", text: "text-pink-600" },
    rumah: { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-700" },
    bisnis: { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-600" },
    keuangan: { bg: "bg-teal-50", border: "border-teal-200", text: "text-teal-600" },
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-pink-600 mb-6 text-center">✨ Tugas Harian & Keuangan</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Pribadi */}
        <div className={`${categoryStyles.pribadi.bg} ${categoryStyles.pribadi.border} rounded-xl p-5 shadow-sm border transition-all hover:shadow-md`}>
          <h3 className="text-lg font-bold flex items-center gap-2 mb-3">
            <span className="text-pink-500">💖</span>
            <span className={categoryStyles.pribadi.text}>Pribadi</span>
          </h3>
          <input
  type="text"
  placeholder="Olahraga, baca buku..."
  value={newTask?.pribadi || ""}
  onChange={(e) => setNewTask(prev => ({ ...prev, pribadi: e.target.value }))}
  className="w-full p-2.5 bg-white border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 mb-3 text-sm"
/>
          <button
            onClick={() => addTask("pribadi")}
            className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 font-medium transition-colors"
          >
            + Tambah Tugas
          </button>

          <div className="mt-4 space-y-2">
            {tasks.pribadi.map((task) => (
              <div
                key={task.id}
                className={`flex items-center justify-between p-2.5 rounded-lg border ${
                  task.completed
                    ? "bg-green-50 border-green-200"
                    : "bg-white border-pink-100"
                }`}
              >
                <div className="flex items-center gap-2">
                  {/* 🔧 MODIFIKASI: Checkbox untuk menandai selesai */}
                  <button
                    onClick={() => toggleCompleted("pribadi", task.id)}
                    className={`p-1 rounded-full border ${
                      task.completed
                        ? "bg-green-500 border-green-500 text-white"
                        : "border-gray-300 hover:border-green-400"
                    }`}
                  >
                    {task.completed ? <FaCheck size={12} /> : ""}
                  </button>
                  <span className={`text-sm ${task.completed ? "line-through text-gray-500" : ""}`}>
                    {task.text}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleFavorite("pribadi", task.id)}
                    className={`transition-colors ${task.isFavorite ? "text-yellow-500" : "text-gray-400 hover:text-yellow-400"}`}
                  >
                    <FaStar size={14} />
                  </button>
                  <button
                    onClick={() => deleteTask("pribadi", task.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rumah Tangga */}
        <div className={`${categoryStyles.rumah.bg} ${categoryStyles.rumah.border} rounded-xl p-5 shadow-sm border transition-all hover:shadow-md`}>
          <h3 className="text-lg font-bold flex items-center gap-2 mb-3">
            <span className="text-amber-500">🏡</span>
            <span className={categoryStyles.rumah.text}>Rumah Tangga</span>
          </h3>
          <input
            type="text"
            placeholder="Masak, bersih-bersih..."
            value={newTask.rumah}
            onChange={(e) => setNewTask({ ...newTask, rumah: e.target.value })}
            className="w-full p-2.5 bg-white border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300 mb-3 text-sm"
          />
          <button
            onClick={() => addTask("rumah")}
            className="w-full bg-amber-500 text-white py-2 rounded-lg hover:bg-amber-600 font-medium transition-colors"
          >
            + Tambah Tugas
          </button>

          <div className="mt-4 space-y-2">
            {tasks.rumah.map((task) => (
              <div
                key={task.id}
                className={`flex items-center justify-between p-2.5 rounded-lg border ${
                  task.completed
                    ? "bg-green-50 border-green-200"
                    : "bg-white border-amber-100"
                }`}
              >
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleCompleted("rumah", task.id)}
                    className={`p-1 rounded-full border ${
                      task.completed
                        ? "bg-green-500 border-green-500 text-white"
                        : "border-gray-300 hover:border-green-400"
                    }`}
                  >
                    {task.completed ? <FaCheck size={12} /> : ""}
                  </button>
                  <span className={`text-sm ${task.completed ? "line-through text-gray-500" : ""}`}>
                    {task.text}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleFavorite("rumah", task.id)}
                    className={`transition-colors ${task.isFavorite ? "text-yellow-500" : "text-gray-400 hover:text-yellow-400"}`}
                  >
                    <FaStar size={14} />
                  </button>
                  <button
                    onClick={() => deleteTask("rumah", task.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bisnis */}
        <div className={`${categoryStyles.bisnis.bg} ${categoryStyles.bisnis.border} rounded-xl p-5 shadow-sm border transition-all hover:shadow-md`}>
          <h3 className="text-lg font-bold flex items-center gap-2 mb-3">
            <span className="text-purple-500">💼</span>
            <span className={categoryStyles.bisnis.text}>Bisnis</span>
          </h3>
          <input
            type="text"
            placeholder="Follow up Klien..."
            value={newTask.bisnis}
            onChange={(e) => setNewTask({ ...newTask, bisnis: e.target.value })}
            className="w-full p-2.5 bg-white border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 mb-3 text-sm"
          />
          <button
            onClick={() => addTask("bisnis")}
            className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 font-medium transition-colors"
          >
            + Tambah Tugas
          </button>

          <div className="mt-4 space-y-2">
            {tasks.bisnis.map((task) => (
              <div
                key={task.id}
                className={`flex items-center justify-between p-2.5 rounded-lg border ${
                  task.completed
                    ? "bg-green-50 border-green-200"
                    : "bg-white border-purple-100"
                }`}
              >
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleCompleted("bisnis", task.id)}
                    className={`p-1 rounded-full border ${
                      task.completed
                        ? "bg-green-500 border-green-500 text-white"
                        : "border-gray-300 hover:border-green-400"
                    }`}
                  >
                    {task.completed ? <FaCheck size={12} /> : ""}
                  </button>
                  <span className={`text-sm ${task.completed ? "line-through text-gray-500" : ""}`}>
                    {task.text}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleFavorite("bisnis", task.id)}
                    className={`transition-colors ${task.isFavorite ? "text-yellow-500" : "text-gray-400 hover:text-yellow-400"}`}
                  >
                    <FaStar size={14} />
                  </button>
                  <button
                    onClick={() => deleteTask("bisnis", task.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Keuangan */}
        <div className={`${categoryStyles.keuangan.bg} ${categoryStyles.keuangan.border} rounded-xl p-5 shadow-sm border transition-all hover:shadow-md`}>
          <h3 className="text-lg font-bold flex items-center gap-2 mb-3">
            <span className="text-teal-500">💰</span>
            <span className={categoryStyles.keuangan.text}>Keuangan</span>
          </h3>

          <div className="flex items-center gap-2 mb-3">
            <input
              type="number"
              placeholder="Pemasukan"
              value={finance.income}
              onChange={(e) => setFinance({ ...finance, income: e.target.value })}
              className="w-full p-2.5 bg-white border border-teal-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300 text-sm"
            />
            <button
              onClick={() => addFinanceRecord("income")}
              className="p-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              title="Tambah Pemasukan"
            >
              +
            </button>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <input
              type="number"
              placeholder="Pengeluaran"
              value={finance.expense}
              onChange={(e) => setFinance({ ...finance, expense: e.target.value })}
              className="w-full p-2.5 bg-white border border-teal-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300 text-sm"
            />
            <button
              onClick={() => addFinanceRecord("expense")}
              className="p-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              title="Tambah Pengeluaran"
            >
              −
            </button>
          </div>

          {/* Ringkasan Saldo */}
          <div className="bg-white p-3 rounded-lg border border-teal-100">
            <div className="flex justify-between text-sm mb-1">
              <span>Pemasukan:</span>
              <span className="text-green-600 font-semibold">Rp{totalIncome.toLocaleString("id-ID")}</span>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span>Pengeluaran:</span>
              <span className="text-red-600 font-semibold">Rp{totalExpense.toLocaleString("id-ID")}</span>
            </div>
            <div className="flex justify-between font-bold pt-2 border-t border-teal-100 mt-1">
              <span>Saldo:</span>
              <span className={saldo >= 0 ? "text-green-600" : "text-red-600"}>
                Rp{saldo.toLocaleString("id-ID")}
              </span>
            </div>
          </div>

          {/* Riwayat */}
          {finance.records.length > 0 && (
            <div className="mt-4 text-xs space-y-1.5 max-h-28 overflow-y-auto pr-1">
              <h4 className="font-semibold text-teal-700 mb-1">Riwayat Transaksi:</h4>
              {finance.records.map((rec) => (
                <div
                  key={rec.id}
                  className="flex justify-between items-center py-1.5 px-2 bg-white rounded border border-teal-100"
                >
                  <span className={rec.type === "income" ? "text-green-600" : "text-red-600"}>
                    {rec.type === "income" ? "↑" : "↓"} Rp{rec.amount.toLocaleString("id-ID")}
                  </span>
                  <button
                    onClick={() => deleteFinanceRecord(rec.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <FaTrash size={12} />
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