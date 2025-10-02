"use client";

import { createContext, useContext, useState, useEffect, useRef } from "react";

const TimerContext = createContext();

export function TimerProvider({ children }) {
  const [mode, setMode] = useState("work");
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
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

 
  useEffect(() => {
    const saved = localStorage.getItem("pomodoro_persistent");
    if (saved) {
      try {
        const { mode: m, timeLeft: t, isActive: a } = JSON.parse(saved);
        setMode(m);
        setTimeLeft(t);
        setIsActive(a);
      } catch (e) {
        console.error("Gagal muat timer");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "pomodoro_persistent",
      JSON.stringify({ mode, timeLeft, isActive })
    );
  }, [mode, timeLeft, isActive]);


  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
          
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
        console.warn("Gagal mainkan musik");
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
        audioRef,
        toggleTimer,
        resetTimer,
        switchMode,
        WORK_TIME,
        BREAK_TIME,
      }}
    >
      {children}
      {/* Audio tetap ada di layout, jadi tidak ikut unmount */}
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