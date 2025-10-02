"use client";
import { useState, useEffect } from "react";

export default function Tasks() {
  // 🧩 LocalStorage keys
  const TASKS_STORAGE_KEY = "shetime_tasks";
  const FINANCE_STORAGE_KEY = "shetime_finance";

  // ✅ Load data tasks dari localStorage (aman & tidak mudah ketimpa)
  const [tasks, setTasks] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(TASKS_STORAGE_KEY);
      if (saved && saved !== "undefined" && saved !== "null") {
        try {
          return JSON.parse(saved);
        } catch {
          console.warn("Data tasks rusak, pakai default.");
        }
      }
    }
    return {
      pribadi: [{ id: 1, text: "Olahraga", isFavorite: false, completed: false }],
      rumah: [{ id: 2, text: "Masak", isFavorite: false, completed: false }],
      bisnis: [{ id: 3, text: "Follow up klien", isFavorite: true, completed: false }],
    };
  });

  // ✅ State keuangan
  const [finance, setFinance] = useState({
    income: "",
    expense: "",
    records: [],
  });

  // 🧾 Load data keuangan dari localStorage (aman)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const savedFinance = localStorage.getItem(FINANCE_STORAGE_KEY);
    if (!savedFinance || savedFinance === "undefined" || savedFinance === "null") return;

    try {
      const parsed = JSON.parse(savedFinance);
      if (parsed && Array.isArray(parsed.records)) {
        setFinance((prev) => ({ ...prev, records: parsed.records }));
      }
    } catch (e) {
      console.error("Gagal memuat data keuangan:", e);
    }
  }, []);

  // 💾 Simpan otomatis ke localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!tasks) return;
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!finance.records || finance.records.length === 0) return;
    localStorage.setItem(FINANCE_STORAGE_KEY, JSON.stringify({ records: finance.records }));
  }, [finance.records]);

  // ✨ Fungsi umum untuk tasks
  const addTask = (category, text) => {
    const newTask = {
      id: Date.now(),
      text,
      isFavorite: false,
      completed: false,
    };
    setTasks((prev) => ({
      ...prev,
      [category]: [...prev[category], newTask],
    }));
  };

  const toggleFavorite = (category, id) => {
    setTasks((prev) => ({
      ...prev,
      [category]: prev[category].map((task) =>
        task.id === id ? { ...task, isFavorite: !task.isFavorite } : task
      ),
    }));
  };

  const toggleCompleted = (category, id) => {
    setTasks((prev) => ({
      ...prev,
      [category]: prev[category].map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ),
    }));
  };

  const deleteTask = (category, id) => {
    setTasks((prev) => ({
      ...prev,
      [category]: prev[category].filter((task) => task.id !== id),
    }));
  };

  // 💰 Fungsi untuk keuangan
  const addRecord = (type) => {
    const amount = type === "income" ? parseFloat(finance.income) : parseFloat(finance.expense);
    if (isNaN(amount) || amount <= 0) return;
    const newRecord = {
      id: Date.now(),
      type,
      amount,
      date: new Date().toLocaleDateString(),
    };
    setFinance((prev) => ({
      income: "",
      expense: "",
      records: [...prev.records, newRecord],
    }));
  };

  const deleteRecord = (id) => {
    setFinance((prev) => ({
      ...prev,
      records: prev.records.filter((record) => record.id !== id),
    }));
  };

  // 🧮 Total income & expense
  const totalIncome = finance.records
    .filter((r) => r.type === "income")
    .reduce((sum, r) => sum + r.amount, 0);

  const totalExpense = finance.records
    .filter((r) => r.type === "expense")
    .reduce((sum, r) => sum + r.amount, 0);

  return (
    <div className="p-6 space-y-8">
      {/* 🌸 Bagian Tugas */}
      <section>
        <h1 className="text-2xl font-bold mb-4 text-purple-700">📋 Daftar Tugas</h1>

        {Object.keys(tasks).map((category) => (
          <div key={category} className="mb-6">
            <h2 className="text-lg font-semibold capitalize mb-2 text-gray-700">{category}</h2>
            <ul className="space-y-2">
              {tasks[category].map((task) => (
                <li
                  key={task.id}
                  className={`flex justify-between items-center p-3 rounded-lg shadow-sm ${
                    task.completed ? "bg-green-100" : "bg-white"
                  }`}
                >
                  <span
                    className={`flex-1 ${
                      task.completed ? "line-through text-gray-500" : "text-gray-800"
                    }`}
                  >
                    {task.text}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleFavorite(category, task.id)}
                      className={`text-lg ${
                        task.isFavorite ? "text-yellow-400" : "text-gray-300"
                      }`}
                    >
                      ★
                    </button>
                    <button
                      onClick={() => toggleCompleted(category, task.id)}
                      className="text-green-600"
                    >
                      ✔
                    </button>
                    <button
                      onClick={() => deleteTask(category, task.id)}
                      className="text-red-500"
                    >
                      ✖
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex mt-3">
              <input
                type="text"
                placeholder={`Tambah tugas ${category}`}
                className="border rounded-l-md px-3 py-2 flex-1 outline-none"
                id={`input-${category}`}
              />
              <button
                onClick={() => {
                  const input = document.getElementById(`input-${category}`);
                  const text = input.value.trim();
                  if (text) {
                    addTask(category, text);
                    input.value = "";
                  }
                }}
                className="bg-purple-600 text-white px-4 rounded-r-md"
              >
                Tambah
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* 💰 Bagian Keuangan */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-purple-700">💰 Keuangan</h2>

        <div className="flex gap-4 mb-4">
          <div>
            <input
              type="number"
              placeholder="Pemasukan"
              value={finance.income}
              onChange={(e) => setFinance({ ...finance, income: e.target.value })}
              className="border rounded px-3 py-2"
            />
            <button
              onClick={() => addRecord("income")}
              className="bg-green-500 text-white px-4 py-2 rounded ml-2"
            >
              + Tambah
            </button>
          </div>

          <div>
            <input
              type="number"
              placeholder="Pengeluaran"
              value={finance.expense}
              onChange={(e) => setFinance({ ...finance, expense: e.target.value })}
              className="border rounded px-3 py-2"
            />
            <button
              onClick={() => addRecord("expense")}
              className="bg-red-500 text-white px-4 py-2 rounded ml-2"
            >
              - Tambah
            </button>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-2">Rekap Keuangan</h3>
          <p>Total Pemasukan: <span className="text-green-600 font-semibold">Rp {totalIncome}</span></p>
          <p>Total Pengeluaran: <span className="text-red-500 font-semibold">Rp {totalExpense}</span></p>
          <p className="mt-2 font-bold">
            Sisa: Rp {totalIncome - totalExpense}
          </p>
        </div>

        <ul className="mt-4 space-y-2">
          {finance.records.map((record) => (
            <li
              key={record.id}
              className={`flex justify-between items-center p-3 rounded-lg shadow-sm ${
                record.type === "income" ? "bg-green-100" : "bg-red-100"
              }`}
            >
              <span>
                {record.type === "income" ? "Pemasukan" : "Pengeluaran"}: Rp {record.amount} — {record.date}
              </span>
              <button
                onClick={() => deleteRecord(record.id)}
                className="text-red-600 font-semibold"
              >
                Hapus
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
