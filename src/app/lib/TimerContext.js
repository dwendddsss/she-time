"use client";

import { createContext, useContext, useState, useEffect, useRef } from "react";

const TimerContext = createContext();

export function TimerProvider({ children }) {
  const [mode, setMode] = useState("work");
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [totalSessions, setTotalSessions] = useState(() => {
    // Muat total sesi dari localStorage saat pertama kali
    const saved = localStorage.getItem("pomodoro_sessions");
    return saved ? parseInt(saved, 10) : 0;
  });
  const audioRef = useRef(null);

  const WORK_TIME = 25 * 60;
  const BREAK_TIME = 5 * 60;
  const LOFI_URL = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

  // Setup audio
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = LOFI_URL;
      audioRef.current.loop = true;
    }
  }, []);

  // Muat state timer dari localStorage
  useEffect(() => {
    const saved = localStorage.getItem("pomodoro_persistent");
    if (saved) {
      try {
        const { mode: m, timeLeft: t, isActive: a } = JSON.parse(saved);
        setMode(m);
        setTimeLeft(t);
        setIsActive(a);
      } catch (e) {
        console.error("Gagal muat timer dari localStorage", e);
      }
    }
  }, []);

  // Simpan state timer ke localStorage
  useEffect(() => {
    localStorage.setItem(
      "pomodoro_persistent",
      JSON.stringify({ mode, timeLeft, isActive })
    );
  }, [mode, timeLeft, isActive]);

  // Simpan totalSessions ke localStorage
  useEffect(() => {
    localStorage.setItem("pomodoro_sessions", totalSessions.toString());
  }, [totalSessions]);

  // Timer countdown logic
  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // 🔥 Jika sesi work selesai, tambahkan totalSessions
            if (mode === "work") {
              setTotalSessions((count) => count + 1);
            }

            // Ganti mode
            const newMode = mode === "work" ? "break" : "work";
            const newTime = newMode === "work" ? WORK_TIME : BREAK_TIME;
            setMode(newMode);
            setIsActive(false);
            return newTime;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode, WORK_TIME, BREAK_TIME]);

  const toggleTimer = async () => {
    if (!isActive) {
      try {
        if (audioRef.current) {
          await audioRef.current.play();
          setIsMusicPlaying(true);
        }
      } catch (err) {
        console.warn("Gagal memutar musik:", err);
        setIsMusicPlaying(false);
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        setIsMusicPlaying(false);
      }
    }
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    if (audioRef.current) {
      audioRef.current.pause();
      setIsMusicPlaying(false);
    }
    setTimeLeft(mode === "work" ? WORK_TIME : BREAK_TIME);
  };

  const switchMode = () => {
    const newMode = mode === "work" ? "break" : "work";
    setMode(newMode);
    setTimeLeft(newMode === "work" ? WORK_TIME : BREAK_TIME);
    setIsActive(false);
    if (audioRef.current) {
      audioRef.current.pause();
      setIsMusicPlaying(false);
    }
  };

  return (
    <TimerContext.Provider
      value={{
        mode,
        timeLeft,
        isActive,
        isMusicPlaying,
        totalSessions, 
        audioRef,
        toggleTimer,
        resetTimer,
        switchMode,
        WORK_TIME,
        BREAK_TIME,
      }}
    >
      {children}
      <audio ref={audioRef} />
    </TimerContext.Provider>
  );
}

export function useTimer() {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error("useTimer must be used within TimerProvider");
  }
  return context;
}