"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function WhiteboardPage() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [penColor, setPenColor] = useState("#8b5cf6");
  const [lineWidth, setLineWidth] = useState(3);
  const [tool, setTool] = useState("pen");
  const [stickyNotes, setStickyNotes] = useState([]);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [height, setHeight] = useState(500);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (!container) return;
      const width = container.clientWidth;
      canvas.width = width;
      canvas.height = height;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [height]);

  // === Fungsi Gambar ===
  const getCanvasContext = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (tool === "pen") {
      ctx.strokeStyle = penColor;
      ctx.globalCompositeOperation = "source-over";
    } else if (tool === "eraser") {
      ctx.strokeStyle = "#ffffff";
      ctx.globalCompositeOperation = "destination-out";
    }
    ctx.lineWidth = lineWidth;
    return ctx;
  };

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = getCanvasContext();
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = getCanvasContext();
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  // === Sticky Notes ===
  const addStickyNote = () => {
    const colors = ["amber", "pink", "emerald", "blue", "purple"];
    const color = colors[stickyNotes.length % colors.length];
    const newNote = {
      id: Date.now(),
      content: "Klik untuk edit...",
      x: 50 + stickyNotes.length * 20,
      y: 100 + stickyNotes.length * 20,
      color,
    };
    setStickyNotes([...stickyNotes, newNote]);
    setIsAddingNote(false);
  };

  const updateNoteContent = (id, content) => {
    setStickyNotes(
      stickyNotes.map((note) => (note.id === id ? { ...note, content } : note))
    );
  };

  const deleteNote = (id) => {
    setStickyNotes(stickyNotes.filter((note) => note.id !== id));
  };

  const moveNote = (id, newX, newY) => {
    setStickyNotes(
      stickyNotes.map((note) =>
        note.id === id ? { ...note, x: newX, y: newY } : note
      )
    );
  };

  
  const startResizing = (e) => {
    e.preventDefault();
    const startY = e.clientY;
    const startHeight = height;

    const doDrag = (dragEvent) => {
      const newHeight = startHeight + (dragEvent.clientY - startY);
      setHeight(Math.max(300, Math.min(1000, newHeight)));
    };

    const stopDrag = () => {
      document.documentElement.removeEventListener("mousemove", doDrag);
      document.documentElement.removeEventListener("mouseup", stopDrag);
    };

    document.documentElement.addEventListener("mousemove", doDrag);
    document.documentElement.addEventListener("mouseup", stopDrag);
  };

  // === Pilihan Warna ===
  const colorOptions = [
    { name: "Ungu", value: "#8b5cf6" },
    { name: "Pink", value: "#ec4899" },
    { name: "Biru", value: "#3b82f6" },
    { name: "Hijau", value: "#10b981" },
    { name: "Kuning", value: "#f59e0b" },
    { name: "Merah", value: "#ef4444" },
    { name: "Hitam", value: "#000000" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6 text-center">
       <h1 className="text-2xl md:text-3xl font-bold text-pink-600">
         🎨 Whiteboard Kreatifmu
       </h1>
      </div>

      {/* Toolbar Warna-Warni */}
      <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-5 p-4 bg-gradient-to-r from-pink-50/30 via-purple-50/30 to-indigo-50/30 rounded-xl border border-pink-100 shadow-sm">
        <button
          onClick={clearCanvas}
          className="px-3 py-2 text-sm font-medium bg-gradient-to-r from-rose-100 to-rose-200 text-rose-700 rounded-lg hover:from-rose-200 hover:to-rose-300 transition-all shadow-sm"
        >
          🧹 Bersihkan
        </button>

        <div className="flex gap-1.5">
          <button
            onClick={() => setTool("pen")}
            className={`px-3 py-2 text-sm font-medium rounded-lg transition-all shadow-sm ${
              tool === "pen"
                ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-md"
                : "bg-white text-gray-700 hover:bg-pink-50"
            }`}
          >
            ✏️ Pena
          </button>
          <button
            onClick={() => setTool("eraser")}
            className={`px-3 py-2 text-sm font-medium rounded-lg transition-all shadow-sm ${
              tool === "eraser"
                ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md"
                : "bg-white text-gray-700 hover:bg-amber-50"
            }`}
          >
            🧽 Penghapus
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700 hidden sm:inline">Warna:</span>
          <div className="flex gap-1">
            {colorOptions.map((color) => (
              <button
                key={color.value}
                onClick={() => setPenColor(color.value)}
                disabled={tool === "eraser"}
                className={`w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 ${
                  penColor === color.value
                    ? "border-gray-600 scale-110"
                    : "border-white/50"
                } ${tool === "eraser" ? "opacity-40 cursor-not-allowed" : ""}`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700 hidden sm:inline">Ketebalan:</span>
          <input
            type="range"
            min="1"
            max="20"
            value={lineWidth}
            onChange={(e) => setLineWidth(Number(e.target.value))}
            className="w-16 accent-pink-500"
          />
          <span className="text-xs text-gray-600 w-8">{lineWidth}px</span>
        </div>

        <button
          onClick={() => setIsAddingNote(true)}
          className="px-3 py-2 text-sm font-medium bg-gradient-to-r from-amber-400 to-amber-200 text-amber-800 rounded-lg hover:shadow-md transition-all shadow-sm"
        >
          📌 + Catatan
        </button>
      </div>

      {/* Canvas */}
      <div
        className="relative bg-white border-2 border-dashed border-pink-200 rounded-xl shadow-lg overflow-hidden"
        style={{ height: `${height}px` }}
      >
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          className="w-full h-full cursor-crosshair block"
        />

        {/* Sticky Notes */}
        {stickyNotes.map((note) => (
          <StickyNote
            key={note.id}
            note={note}
            onUpdate={updateNoteContent}
            onDelete={deleteNote}
            onMove={moveNote}
          />
        ))}

        {/* Handle Resize */}
        <div
          onMouseDown={startResizing}
          className="absolute bottom-0 left-0 right-0 h-3 bg-pink-100 flex items-center justify-center cursor-row-resize hover:bg-pink-200 transition-colors"
        >
          <div className="w-10 h-1 bg-pink-400 rounded-full"></div>
        </div>
      </div>

      {/* Konfirmasi Tambah Catatan */}
      {isAddingNote && (
        <div className="mt-4 flex justify-center gap-3">
          <button
            onClick={addStickyNote}
            className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:shadow-md transition-all"
          >
            ✅ Tambah Catatan
          </button>
          <button
            onClick={() => setIsAddingNote(false)}
            className="px-4 py-2 text-sm font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all"
          >
            Batal
          </button>
        </div>
      )}

      {/* Tips */}
      <p className="mt-5 text-center text-sm text-gray-500 max-w-2xl mx-auto">
        💡 <span className="text-pink-600 font-medium">Tips:</span> Tarik garis di bawah whiteboard untuk ubah ukuran. Klik 📌 untuk tambah catatan warna-warni!
      </p>
    </div>
  );
}

// === Komponen StickyNote ===
function StickyNote({ note, onUpdate, onDelete, onMove }) {
  const noteRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const bgColorMap = {
    amber: "bg-amber-100 border-amber-300",
    pink: "bg-pink-100 border-pink-300",
    emerald: "bg-emerald-100 border-emerald-300",
    blue: "bg-blue-100 border-blue-300",
    purple: "bg-purple-100 border-purple-300",
  };

  const bgColor = bgColorMap[note.color] || "bg-amber-100 border-amber-300";

  const handleMouseDown = (e) => {
    if (e.target.tagName === "TEXTAREA") return;
    const rect = noteRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;
    onMove(note.id, newX, newY);
  };

  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  return (
    <div
      ref={noteRef}
      className={`absolute ${bgColor} rounded-lg shadow-md p-2.5 w-40 cursor-grab select-none border`}
      style={{
        left: note.x,
        top: note.y,
        cursor: isDragging ? "grabbing" : "grab",
        zIndex: 10,
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="flex justify-between items-start mb-1.5">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(note.id);
          }}
          className="text-gray-500 hover:text-rose-600 text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full hover:bg-rose-100 transition-colors"
        >
          ✕
        </button>
      </div>
      <textarea
        value={note.content}
        onChange={(e) => onUpdate(note.id, e.target.value)}
        className="w-full bg-transparent text-xs text-gray-800 placeholder-gray-500 outline-none resize-none"
        rows="3"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}