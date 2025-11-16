"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Trash2,
  PenTool,
  Eraser,
  Plus,
  Palette,
  Type,
  Maximize2,
} from "lucide-react";

export default function WhiteboardPage() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [penColor, setPenColor] = useState("#E91E63"); // pink utama
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
    const colors = ["pink", "amber", "emerald", "blue"]; // tanpa ungu
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

  // === Pilihan Warna (tanpa ungu) ===
  const colorOptions = [
    { name: "Pink", value: "#E91E63" },
    { name: "Merah Muda", value: "#EC4899" },
    { name: "Biru", value: "#3B82F6" },
    { name: "Hijau", value: "#10B981" },
    { name: "Kuning", value: "#F59E0B" },
    { name: "Merah", value: "#EF4444" },
    { name: "Hitam", value: "#000000" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 bg-[#FFF9FB] min-h-screen">
      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-[#E91E63]">
          Whiteboard Kreatifmu
        </h1>
      </div>

      {/* Toolbar — konsisten dengan desain utama */}
      <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-5 p-4 bg-white rounded-xl border border-[#F8BBD0] shadow-sm">
        <button
          onClick={clearCanvas}
          className="px-4 py-2 text-sm font-medium bg-[#FCE4EC] text-[#E91E63] rounded-lg hover:bg-[#F8BBD0] transition-colors flex items-center gap-1.5"
        >
          <Trash2 size={16} />
          Bersihkan
        </button>

        <div className="flex gap-2">
          <button
            onClick={() => setTool("pen")}
            className={`px-4 py-2 text-sm font-medium rounded-lg flex items-center gap-1.5 transition-colors ${
              tool === "pen"
                ? "bg-[#E91E63] text-white"
                : "bg-white text-[#C2185B] border border-[#F8BBD0] hover:bg-[#FFF0F5]"
            }`}
          >
            <PenTool size={16} />
            Pena
          </button>
          <button
            onClick={() => setTool("eraser")}
            className={`px-4 py-2 text-sm font-medium rounded-lg flex items-center gap-1.5 transition-colors ${
              tool === "eraser"
                ? "bg-gray-200 text-gray-800"
                : "bg-white text-[#C2185B] border border-[#F8BBD0] hover:bg-gray-50"
            }`}
          >
            <Eraser size={16} />
            Penghapus
          </button>
        </div>

        <div className="flex items-center gap-2">
          <Palette size={16} className="text-[#AD1457]" />
          <div className="flex gap-1.5">
            {colorOptions.map((color) => (
              <button
                key={color.value}
                onClick={() => setPenColor(color.value)}
                disabled={tool === "eraser"}
                className={`w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 ${
                  penColor === color.value
                    ? "border-[#C2185B] scale-110"
                    : "border-[#F8BBD0]"
                } ${tool === "eraser" ? "opacity-40 cursor-not-allowed" : ""}`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Type size={16} className="text-[#AD1457]" />
          <input
            type="range"
            min="1"
            max="20"
            value={lineWidth}
            onChange={(e) => setLineWidth(Number(e.target.value))}
            className="w-16 accent-[#E91E63]"
          />
          <span className="text-xs text-[#AD1457] w-8">{lineWidth}px</span>
        </div>

        <button
          onClick={() => setIsAddingNote(true)}
          className="px-4 py-2 text-sm font-medium bg-[#FCE4EC] text-[#E91E63] rounded-lg hover:bg-[#F8BBD0] transition-colors flex items-center gap-1.5"
        >
          <Plus size={16} />
          Catatan
        </button>
      </div>

      {/* Canvas */}
      <div
        className="relative bg-white border-2 border-dashed border-[#F8BBD0] rounded-xl shadow-sm overflow-hidden"
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
          className="absolute bottom-0 left-0 right-0 h-3 bg-[#FCE4EC] flex items-center justify-center cursor-row-resize hover:bg-[#F8BBD0] transition-colors"
        >
          <div className="w-10 h-1 bg-[#E91E63] rounded-full"></div>
        </div>
      </div>

      {/* Konfirmasi Tambah Catatan */}
      {isAddingNote && (
        <div className="mt-4 flex justify-center gap-3">
          <button
            onClick={addStickyNote}
            className="px-4 py-2 text-sm font-medium bg-[#E91E63] text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Tambah Catatan
          </button>
          <button
            onClick={() => setIsAddingNote(false)}
            className="px-4 py-2 text-sm font-medium bg-white text-[#C2185B] border border-[#F8BBD0] rounded-lg hover:bg-[#FFF0F5] transition-colors"
          >
            Batal
          </button>
        </div>
      )}

      {/* Tips — tanpa emotikon */}
      <p className="mt-5 text-center text-sm text-[#AD1457] max-w-2xl mx-auto">
        <span className="font-medium text-[#E91E63]">Tips:</span> Tarik garis di bawah whiteboard untuk ubah ukuran. Klik tombol Catatan untuk tambah catatan warna-warni!
      </p>
    </div>
  );
}

// === Komponen StickyNote (tanpa emotikon, warna selaras) ===
function StickyNote({ note, onUpdate, onDelete, onMove }) {
  const noteRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const bgColorMap = {
    amber: "bg-amber-100 border-amber-300",
    pink: "bg-pink-100 border-pink-300",
    emerald: "bg-emerald-100 border-emerald-300",
    blue: "bg-blue-100 border-blue-300",
  };

  const bgColor = bgColorMap[note.color] || "bg-pink-100 border-pink-300";

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
      className={`absolute ${bgColor} rounded-lg shadow-sm p-2.5 w-40 cursor-grab select-none border`}
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
          className="text-gray-500 hover:text-[#E91E63] text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full hover:bg-pink-100 transition-colors"
        >
          <span className="text-xs">✕</span>
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