"use client";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 text-gray-800 relative overflow-hidden">
      {/* Animated floating elements */}
      <div className="absolute top-16 -left-12 w-40 h-40 rounded-full bg-pink-200 opacity-50 blur-3xl animate-float-slow"></div>
      <div className="absolute bottom-24 -right-16 w-56 h-56 rounded-full bg-purple-200 opacity-40 blur-3xl animate-float"></div>
      <div className="absolute top-1/3 right-1/4 w-20 h-20 rounded-full bg-indigo-200 opacity-30 animate-bounce-slow"></div>
      <div className="absolute bottom-1/3 left-1/4 w-12 h-12 rounded-full bg-amber-200 opacity-40 animate-pulse"></div>

      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        {/* Hero Section - Lebih Ekspresif */}
        <div className="text-center max-w-4xl mx-auto mb-24">
          <div className="inline-block mb-6">
            <span className="px-4 py-1.5 bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 rounded-full text-sm font-medium border border-pink-200">
              ✨ Baru saja diluncurkan!
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6">
            <span className="block">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-gradient">
                SheTime
              </span>
            </span>
            <span className="block mt-2 text-gray-700 text-2xl md:text-3xl font-light">
              Untukmu yang ingin <span className="text-pink-500">teratur</span>, tapi tetap <span className="text-purple-500">bebas</span>.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed px-2">
            Satu tempat untuk merencanakan hari, mengelola keuangan, mencatat ide liar, dan menemukan ketenangan — tanpa ribet.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/dashboard"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              🚀 Mulai Gratis Sekarang
            </Link>
            <Link
              href="#fitur"
              className="px-8 py-4 rounded-full bg-white/70 backdrop-blur-sm text-gray-700 font-semibold border border-gray-200 hover:bg-white hover:shadow-md transition-all"
            >
              Jelajahi Fitur →
            </Link>
          </div>
        </div>

        {/* Feature Section - Lebih Visual */}
        <div id="fitur" className="max-w-6xl mx-auto mb-28">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Dibuat untuk <span className="text-indigo-600">hidupmu</span> yang sibuk
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Setiap fitur dirancang agar kamu merasa didukung — bukan diawasi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🗓️",
                title: "Kalender Cerdas",
                desc: "Lihat semua agenda dalam satu tampilan warna-warni. Setiap tanggal dengan acara punya warna unik!",
                color: "from-pink-400 to-rose-400",
              },
              {
                icon: "✅",
                title: "Tugas Harian",
                desc: "Kelola tugas pribadi, rumah, dan bisnis dalam satu tempat — dengan prioritas & favorit.",
                color: "from-purple-400 to-indigo-400",
              },
              {
                icon: "💰",
                title: "Keuangan Sederhana",
                desc: "Catat pemasukan & pengeluaran tanpa ribet. Saldo langsung terlihat, real-time.",
                color: "from-emerald-400 to-teal-400",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="group bg-white/60 backdrop-blur-sm p-7 rounded-2xl border border-white/50 shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <span className="text-white text-2xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Closing CTA - Lebih Personal */}
        <div className="text-center max-w-3xl mx-auto bg-gradient-to-r from-white/60 to-purple-50/40 backdrop-blur-sm p-8 rounded-3xl border border-white/50 shadow-lg">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Kamu layak punya ruang yang <span className="text-pink-500">mengerti</span> dirimu.
          </h3>
          <p className="text-gray-600 mb-6 text-lg">
            SheTime bukan sekadar aplikasi — ini teman setiamu untuk hidup yang lebih tenang, teratur, dan penuh makna.
          </p>
          <Link
            href="/dashboard"
            className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
          >
            ✨ Mulai Perjalananmu Sekarang
          </Link>
        </div>
      </div>
    </div>
  );
}