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

  // Tambah tugas
  const addTask = (category) => {
    if (!newTask[category]) return;

    const newEntry = {
      id: Date.now(),
      text: newTask[category],
      isFavorite: false,
    };

    setTasks({
      ...tasks,
      [category]: [...tasks[category], newEntry],
    });

    setNewTask({ ...newTask, [category]: "" });
  };

  // Hapus tugas
  const deleteTask = (category, id) => {
    setTasks({
      ...tasks,
      [category]: tasks[category].filter((task) => task.id !== id),
    });
  };

  // Toggle favorit
  const toggleFavorite = (category, id) => {
    setTasks({
      ...tasks,
      [category]: tasks[category].map((task) =>
        task.id === id ? { ...task, isFavorite: !task.isFavorite } : task
      ),
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-pink-600 mb-6">Tugas Harian</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Pribadi */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-lg font-semibold text-pink-500 mb-2">💖 Pribadi</h3>
          <input
            type="text"
            placeholder="Olahraga, baca buku..."
            value={newTask.pribadi}
            onChange={(e) =>
              setNewTask({ ...newTask, pribadi: e.target.value })
            }
            className="w-full p-2 border rounded mb-2"
          />
          <button
            onClick={() => addTask("pribadi")}
            className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600"
          >
            Tambah
          </button>

          <ul className="mt-3 space-y-2">
            {tasks.pribadi.map((task) => (
              <li
                key={task.id}
                className="flex items-center justify-between p-2 border rounded"
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
              </li>
            ))}
          </ul>
        </div>

        {/* Rumah Tangga */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-lg font-semibold text-pink-500 mb-2">🏡 Rumah Tangga</h3>
          <input
            type="text"
            placeholder="Masak, bersih-bersih..."
            value={newTask.rumah}
            onChange={(e) =>
              setNewTask({ ...newTask, rumah: e.target.value })
            }
            className="w-full p-2 border rounded mb-2"
          />
          <button
            onClick={() => addTask("rumah")}
            className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600"
          >
            Tambah
          </button>

          <ul className="mt-3 space-y-2">
            {tasks.rumah.map((task) => (
              <li
                key={task.id}
                className="flex items-center justify-between p-2 border rounded"
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
              </li>
            ))}
          </ul>
        </div>

        {/* Bisnis */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-lg font-semibold text-pink-500 mb-2">💼 Bisnis</h3>
          <input
            type="text"
            placeholder="Follow up client..."
            value={newTask.bisnis}
            onChange={(e) =>
              setNewTask({ ...newTask, bisnis: e.target.value })
            }
            className="w-full p-2 border rounded mb-2"
          />
          <button
            onClick={() => addTask("bisnis")}
            className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600"
          >
            Tambah
          </button>

          <ul className="mt-3 space-y-2">
            {tasks.bisnis.map((task) => (
              <li
                key={task.id}
                className="flex items-center justify-between p-2 border rounded"
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
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
