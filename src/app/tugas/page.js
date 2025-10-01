"use client";
import { useState } from "react";
import { FaTrash, FaStar } from "react-icons/fa";

export default function Tasks() {
  const [tasks, setTasks] = useState({
    pribadi: [{ id: 1, text: "Olahraga", isFavorite: false }],
    rumah: [{ id: 2, text: "Masak", isFavorite: false }],
    bisnis: [{ id: 3, text: "Follow up klien", isFavorite: true }],
  });

  const [newTask, setNewTask] = useState({
    pribadi: "",
    rumah: "",
    bisnis: "",
  });

  // 🔹 State keuangan
  const [finance, setFinance] = useState({
    income: "",
    expense: "",
    records: [],
  });

  // --- Fungsi Tugas ---
  const addTask = (category) => {
    if (!newTask[category].trim()) return;
    const newEntry = { id: Date.now(), text: newTask[category], isFavorite: false };
    setTasks({ ...tasks, [category]: [...tasks[category], newEntry] });
    setNewTask({ ...newTask, [category]: "" });
  };

  const deleteTask = (category, id) => {
    setTasks({ ...tasks, [category]: tasks[category].filter((task) => task.id !== id) });
  };

  const toggleFavorite = (category, id) => {
    setTasks({
      ...tasks,
      [category]: tasks[category].map((task) =>
        task.id === id ? { ...task, isFavorite: !task.isFavorite } : task
      ),
    });
  };

  // --- Fungsi Keuangan ---
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

    setFinance({
      ...finance,
      records: [...finance.records, newRecord],
      income: type === "income" ? "" : finance.income,
      expense: type === "expense" ? "" : finance.expense,
    });
  };

  const deleteFinanceRecord = (id) => {
    setFinance({
      ...finance,
      records: finance.records.filter((rec) => rec.id !== id),
    });
  };

  const totalIncome = finance.records
    .filter((r) => r.type === "income")
    .reduce((sum, r) => sum + r.amount, 0);
  const totalExpense = finance.records
    .filter((r) => r.type === "expense")
    .reduce((sum, r) => sum + r.amount, 0);
  const saldo = totalIncome - totalExpense;

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-2xl font-bold text-pink-600 mb-6">Tugas Harian & Keuangan</h2>

      {/* Grid 4 kolom */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Pribadi */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-pink-500 mb-3">💖 Pribadi</h3>
          <input
            type="text"
            placeholder="Olahraga, baca buku..."
            value={newTask.pribadi}
            onChange={(e) => setNewTask({ ...newTask, pribadi: e.target.value })}
            className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-pink-500 mb-3"
          />
          <button
            onClick={() => addTask("pribadi")}
            className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600 font-medium"
          >
            Tambah
          </button>

          <div className="mt-4 space-y-2">
            {tasks.pribadi.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-2 border border-gray-200 rounded"
              >
                <span>{task.text}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleFavorite("pribadi", task.id)}
                    className={`${
                      task.isFavorite ? "text-yellow-500" : "text-gray-400"
                    }`}
                  >
                    <FaStar />
                  </button>
                  <button
                    onClick={() => deleteTask("pribadi", task.id)}
                    className="text-red-500"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rumah Tangga */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-pink-500 mb-3">🏡 Rumah Tangga</h3>
          <input
            type="text"
            placeholder="Masak, bersih-bersih..."
            value={newTask.rumah}
            onChange={(e) => setNewTask({ ...newTask, rumah: e.target.value })}
            className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-pink-500 mb-3"
          />
          <button
            onClick={() => addTask("rumah")}
            className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600 font-medium"
          >
            Tambah
          </button>

          <div className="mt-4 space-y-2">
            {tasks.rumah.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-2 border border-gray-200 rounded"
              >
                <span>{task.text}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleFavorite("rumah", task.id)}
                    className={`${
                      task.isFavorite ? "text-yellow-500" : "text-gray-400"
                    }`}
                  >
                    <FaStar />
                  </button>
                  <button
                    onClick={() => deleteTask("rumah", task.id)}
                    className="text-red-500"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bisnis */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-pink-500 mb-3">💼 Bisnis</h3>
          <input
            type="text"
            placeholder="Follow up client..."
            value={newTask.bisnis}
            onChange={(e) => setNewTask({ ...newTask, bisnis: e.target.value })}
            className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-pink-500 mb-3"
          />
          <button
            onClick={() => addTask("bisnis")}
            className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600 font-medium"
          >
            Tambah
          </button>

          <div className="mt-4 space-y-2">
            {tasks.bisnis.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-2 border border-gray-200 rounded"
              >
                <span>{task.text}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleFavorite("bisnis", task.id)}
                    className={`${
                      task.isFavorite ? "text-yellow-500" : "text-gray-400"
                    }`}
                  >
                    <FaStar />
                  </button>
                  <button
                    onClick={() => deleteTask("bisnis", task.id)}
                    className="text-red-500"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Keuangan */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-pink-500 mb-3">💰 Keuangan</h3>

          {/* Input Pemasukan */}
          <div className="flex items-center gap-2 mb-3">
            <input
              type="number"
              placeholder="Pemasukan"
              value={finance.income}
              onChange={(e) => setFinance({ ...finance, income: e.target.value })}
              className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-pink-500 mb-3"
            />
            <button
              onClick={() => addFinanceRecord("income")}
              className="p-2 bg-pink-500 text-white rounded hover:bg-pink-600"
            >
              +
            </button>
          </div>

          {/* Input Pengeluaran */}
          <div className="flex items-center gap-2 mb-4">
            <input
              type="number"
              placeholder="Pengeluaran"
              value={finance.expense}
              onChange={(e) => setFinance({ ...finance, expense: e.target.value })}
              className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-pink-500 mb-3"
            />
            <button
              onClick={() => addFinanceRecord("expense")}
             className="p-2 bg-pink-500 text-white rounded hover:bg-pink-600"
            >
              -
            </button>
          </div>

          {/* Ringkasan Saldo */}
          <div className="bg-gray-50 p-3 rounded">
            <div className="flex justify-between text-sm mb-1">
              <span>Pemasukan:</span>
              <span className="text-green-600 font-medium">Rp{totalIncome.toLocaleString("id-ID")}</span>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span>Pengeluaran:</span>
              <span className="text-red-600 font-medium">Rp{totalExpense.toLocaleString("id-ID")}</span>
            </div>
            <div className="flex justify-between text-sm font-bold pt-1 border-t">
              <span>Saldo:</span>
              <span className={saldo >= 0 ? "text-green-600" : "text-red-600"}>
                Rp{saldo.toLocaleString("id-ID")}
              </span>
            </div>
          </div>

          {/* Riwayat Transaksi */}
          {finance.records.length > 0 && (
            <div className="mt-4 text-xs space-y-1 max-h-28 overflow-y-auto">
              <h4 className="font-semibold text-gray-700 mb-1">Riwayat:</h4>
              {finance.records.map((rec) => (
                <div
                  key={rec.id}
                  className="flex justify-between items-center py-1 border-b border-gray-100"
                >
                  <span className={rec.type === "income" ? "text-green-600" : "text-red-600"}>
                    {rec.type === "income" ? "↑" : "↓"} Rp{rec.amount.toLocaleString("id-ID")}
                  </span>
                  <button
                    onClick={() => deleteFinanceRecord(rec.id)}
                    className="text-gray-400 hover:text-red-500"
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