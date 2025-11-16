"use client";
import { useTimer } from "../lib/TimerContext";
import { Play, Pause, RotateCcw, Headphones } from "lucide-react";

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

  // Gunakan warna pink untuk semua mode — konsisten dengan brand
  const timerColor = "text-[#E91E63]";
  const buttonBg = "bg-[#E91E63] hover:bg-[#C2185B]";
  const badgeBg = "bg-[#FCE4EC] text-[#E91E63] border-[#F8BBD0]";
  const borderColor = "border-[#F8BBD0]";

  return (
    <div className="p-4 md:p-6 bg-[#FFF9FB] min-h-screen">
      <h2 className="text-2xl font-bold text-center mb-6 text-[#C2185B]">
        Pomodoro Timer
      </h2>

      <div
        className={`max-w-md mx-auto rounded-xl overflow-hidden border-2 ${borderColor} shadow-sm`}
      >
        <div className="p-6 bg-white">
          <div className="text-center mb-6">
            <span
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold ${badgeBg} border`}
            >
              {isWorkMode ? "Mode Fokus" : "Mode Istirahat"}
              {isMusicPlaying && (
                <Headphones
                  className="text-[#E91E63] animate-pulse"
                  size={14}
                />
              )}
            </span>
          </div>

          <div className="text-center mb-8">
            <div className={`text-7xl font-extrabold tracking-tighter ${timerColor}`}>
              {formatTime(timeLeft)}
            </div>
          </div>

          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={toggleTimer}
              className={`flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white shadow-sm transition-all hover:opacity-95 ${buttonBg}`}
            >
              {isActive ? <Pause size={18} /> : <Play size={18} />}
              {isActive ? "Jeda" : "Mulai"}
            </button>
            <button
              onClick={resetTimer}
              className="flex items-center gap-2 px-6 py-3.5 bg-white text-[#C2185B] font-bold rounded-xl border border-[#F8BBD0] hover:bg-[#FFF0F5] transition-colors"
            >
              <RotateCcw size={18} />
              Reset
            </button>
          </div>

          <div className="text-center">
            <button
              onClick={switchMode}
              className="font-medium text-[#E91E63] hover:text-[#C2185B] transition-colors"
            >
              Ubah ke Mode {isWorkMode ? "Istirahat" : "Fokus"}
            </button>
          </div>
        </div>
      </div>

      <p className="text-center text-[#AD1457] mt-6 text-sm max-w-md mx-auto leading-relaxed">
        <span className="font-medium">25 menit fokus</span> +{" "}
        <span className="font-medium">5 menit istirahat</span> = produktivitas maksimal!
      </p>
    </div>
  );
}