"use client";
import { useState, useEffect, useRef } from "react";

export default function Alat() {

  const [mode, setMode] = useState("work");
  const [timeLeft, setTimeLeft] = useState(25 * 60); 
  const [isActive, setIsActive] = useState(false);
  const audioRef = useRef(null);

  
  const workDuration = 25 * 60; 
  const breakDuration = 5 * 60; 

  // Efek saat waktu berubah
  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      if (audioRef.current) {
        audioRef.current.play().catch((e) => console.log("Audio play error:", e));
      }
      setIsActive(false);
      setMode((prev) => (prev === "work" ? "break" : "work"));
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

 
  useEffect(() => {
    setTimeLeft(mode === "work" ? workDuration : breakDuration);
    setIsActive(false);
  }, [mode]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === "work" ? workDuration : breakDuration);
  };

 
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <>
      <audio ref={audioRef}>
        <source
          src="data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQcm9maWxlAAAAAAAAAAAAAAR2ZXJzAAAAHgAAA1N3aXRjaCBQcm9maWxlIFZlcnNpb24gMS4wAFRFTkMAAAANAAADU291bmREYXRhAAAAJAAAABhMYXZjNTcuODMuMTAwIGxpYnNvZmlhAAB42pWUy07DMBBF/8XeZpE4DwmJN1KkFV2wQFWlCgsWfAHLH8DP8BfskNiABKpUqYvOxJ7x9Vw7cRyHJxKJRCJxT1VVVdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0Td......" // beep base64
          type="audio/mpeg"
        />
        Your browser does not support the audio element.
      </audio>

      <div className="p-4 md:p-6">
        <h2 className="text-2xl font-bold text-pink-600 mb-6">🛠 Alat Produktivitas</h2>

        <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow">
          <div className="text-center mb-6">
            <span
              className={`inline-block px-4 py-1 rounded-full text-sm font-semibold ${
                mode === "work"
                  ? "bg-pink-100 text-pink-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {mode === "work" ? "🧠 Fokus" : "☕ Istirahat"}
            </span>
          </div>

          {/* Timer */}
          <div className="text-center mb-8">
            <div
              className={`text-5xl font-bold ${
                mode === "work" ? "text-pink-600" : "text-blue-500"
              }`}
            >
              {formatTime(timeLeft)}
            </div>
          </div>

          {/* Tombol Kontrol */}
          <div className="flex justify-center gap-3 mb-6">
            <button
              onClick={toggleTimer}
              className={`px-5 py-2 rounded-full font-medium ${
                isActive
                  ? "bg-red-500 hover:bg-red-600 text-white"
                  : "bg-pink-500 hover:bg-pink-600 text-white"
              }`}
            >
              {isActive ? "⏸ Jeda" : "▶ Mulai"}
            </button>
            <button
              onClick={resetTimer}
              className="px-5 py-2 bg-gray-200 hover:bg-gray-300 rounded-full font-medium text-gray-700"
            >
              🔁 Reset
            </button>
          </div>

          {/* Ganti Mode */}
          <div className="text-center">
            <button
              onClick={() => setMode(mode === "work" ? "break" : "work")}
              className="text-pink-600 hover:text-pink-800 font-medium"
            >
              {mode === "work"
                ? "Ubah ke Mode Istirahat"
                : "Ubah ke Mode Fokus"}
            </button>
          </div>
        </div>

        <p className="text-center text-gray-500 mt-6 text-sm">
          Teknik Pomodoro: 25 menit fokus, 5 menit istirahat ✨
        </p>
      </div>
    </>
  );
}