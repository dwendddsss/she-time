"use client";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 text-gray-800 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-pink-200 opacity-40 blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-purple-200 opacity-30 blur-3xl animate-float"></div>
      <div className="absolute top-1/3 right-1/4 w-16 h-16 rounded-full bg-indigo-200 opacity-25 animate-float-delayed"></div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-gradient">
              SheTime✨
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
            Ruang pribadimu untuk merencanakan hari, mengelola keuangan, mencatat ide, dan menemukan ketenangan di tengah kesibukan.
          </p>
          <Link
            href="/dashboard"
            className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Mulai Hari Ini — Gratis!
          </Link>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "Rencanakan Hari",
              desc: "Buat jadwal harian yang realistis dan penuh energi positif.",
              color: "from-pink-400 to-pink-500",
            },
            {
              title: "Kelola Keuangan",
              desc: "Catat pengeluaran, atur anggaran, dan capai kebebasan finansial.",
              color: "from-purple-400 to-purple-500",
            },
            {
              title: "Catat Ide & Mimpi",
              desc: "Simpan setiap inspirasi sebelum menguap — besar atau kecil.",
              color: "from-indigo-400 to-indigo-500",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-white/40 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} mb-4 flex items-center justify-center`}>
                <span className="text-white text-xl">✦</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Closing CTA */}
        <div className="text-center mt-20 max-w-2xl mx-auto">
          <p className="text-gray-600 mb-6 text-lg">
            SheTime bukan sekadar aplikasi — ini teman setiamu untuk hidup yang lebih teratur, tenang, dan penuh makna.
          </p>
          <Link
            href="/dashboard"
            className="inline-block px-7 py-3.5 rounded-full bg-white text-purple-600 font-semibold border-2 border-purple-200 shadow hover:bg-purple-50 transition"
          >
            Coba Sekarang →
          </Link>
        </div>
      </div>
    </div>
  );
}