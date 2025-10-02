"use client";
import { useTimer } from "../lib/TimerContext";
import { FaHeadphones, FaPlay, FaPause, FaRedo } from "react-icons/fa";

export default function Alat() {
  const {
    mode,
    timeLeft,
    isActive,
    isMusicPlaying,
    toggleTimer,
    resetTimer,
    switchMode,
  } = useTimer();

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const isWorkMode = mode === "work";
  const bgGradient = isWorkMode
    ? "from-rose-50 via-pink-50 to-purple-50"
    : "from-sky-50 via-cyan-50 to-teal-50";
  const timerColor = isWorkMode ? "text-rose-600" : "text-sky-600";
  const buttonBg = isWorkMode ? "bg-rose-500 hover:bg-rose-600" : "bg-sky-500 hover:bg-sky-600";
  const badgeBg = isWorkMode ? "bg-rose-100 text-rose-700" : "bg-sky-100 text-sky-700";
  const shadowColor = isWorkMode ? "shadow-rose-200" : "shadow-cyan-200";

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-2xl font-bold text-center mb-6 flex items-center justify-center gap-2">
        <span className={isWorkMode ? "text-rose-500" : "text-sky-500"}>🍅</span>
        <span className={isWorkMode ? "text-rose-600" : "text-sky-600"}>Pomodoro Timer</span>
      </h2>

      <div
        className={`max-w-md mx-auto rounded-2xl overflow-hidden border-2 ${
          isWorkMode ? "border-rose-200" : "border-sky-200"
        } shadow-xl ${shadowColor} transition-all duration-300`}
      >
        <div className={`p-6 bg-gradient-to-br ${bgGradient}`}>
          <div className="text-center mb-6">
            <span
              className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-bold ${badgeBg} border ${
                isWorkMode ? "border-rose-200" : "border-sky-200"
              }`}
            >
              {isWorkMode ? "🧠 Mode Fokus" : "☕ Mode Istirahat"}
              {isMusicPlaying && (
                <FaHeadphones
                  className={`text-sm ${
                    isWorkMode ? "text-rose-500" : "text-sky-500"
                  } animate-pulse`}
                />
              )}
            </span>
          </div>

          <div className="text-center mb-8">
            <div
              className={`text-7xl font-extrabold tracking-tighter ${timerColor} drop-shadow-sm`}
            >
              {formatTime(timeLeft)}
            </div>
          </div>

          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={toggleTimer}
              className={`flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white shadow-lg transform transition-all hover:scale-105 active:scale-95 ${buttonBg}`}
            >
              {isActive ? <FaPause /> : <FaPlay />}
              {isActive ? "Jeda" : "Mulai"}
            </button>
            <button
              onClick={resetTimer}
              className="flex items-center gap-2 px-6 py-3.5 bg-white text-gray-700 rounded-xl font-bold shadow border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <FaRedo />
              Reset
            </button>
          </div>

          <div className="text-center">
            <button
              onClick={switchMode}
              className={`font-medium flex items-center justify-center gap-1 mx-auto ${
                isWorkMode ? "text-rose-600 hover:text-rose-800" : "text-sky-600 hover:text-sky-800"
              }`}
            >
              Ubah ke Mode {isWorkMode ? "Istirahat" : "Fokus"}
            </button>
          </div>
        </div>
      </div>

      <p className="text-center text-gray-600 mt-6 text-sm max-w-md mx-auto leading-relaxed">
        <span className="text-rose-500">25 menit fokus</span> +{" "}
        <span className="text-sky-500">5 menit istirahat</span> = produktivitas maksimal! ✨
      </p>
    </div>
  );
}