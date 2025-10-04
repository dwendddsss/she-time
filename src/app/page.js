"use client";
import Link from "next/link";
import Footer from "./components/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-pink-50 text-pink-900 relative overflow-hidden">
      {/* Animated floating elements — ubah ke nuansa pink/soft */}
      <div className="absolute top-16 -left-12 w-40 h-40 rounded-full bg-pink-200 opacity-40 blur-3xl animate-float-slow"></div>
      <div className="absolute bottom-24 -right-16 w-56 h-56 rounded-full bg-rose-200 opacity-30 blur-3xl animate-float"></div>
      <div className="absolute top-1/3 right-1/4 w-20 h-20 rounded-full bg-pink-100 opacity-25 animate-bounce-slow"></div>
      <div className="absolute bottom-1/3 left-1/4 w-12 h-12 rounded-full bg-rose-100 opacity-35 animate-pulse"></div>

      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-24">
          <div className="inline-block mb-6">
            <span className="px-4 py-1.5 bg-pink-100 text-pink-600 rounded-full text-sm font-medium border border-pink-200">
              ✨ Baru saja diluncurkan!
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight mb-6">
            <span className="block text-pink-500">SheTime</span>
            <span className="block mt-3 text-pink-700 text-xl md:text-2xl font-normal">
              Untukmu yang ingin <span className="text-pink-400">teratur</span>, tapi tetap <span className="text-pink-300">bebas</span>.
            </span>
          </h1>

          <p className="text-base md:text-lg text-pink-700 mb-10 max-w-2xl mx-auto leading-relaxed px-2">
            Satu ruang tenang untuk menata hari, mengatur keuangan, dan menyimpan ide-ide kecilmu — tanpa tekanan, penuh kelembutan.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/dashboard"
              className="px-7 py-3.5 rounded-full bg-pink-500 text-white font-medium shadow-md hover:shadow-lg transform hover:scale-[1.03] transition-all duration-300"
            >
              ✨ Mulai Gratis Sekarang
            </Link>
            <Link
              href="#fitur"
              className="px-7 py-3.5 rounded-full bg-white text-pink-700 font-medium border border-pink-200 hover:bg-pink-50 hover:shadow-sm transition-all"
            >
              Jelajahi Fitur →
            </Link>
          </div>
        </div>

        {/* Feature Section */}
        <div id="fitur" className="max-w-6xl mx-auto mb-24">
          <div className="text-center mb-14">
            <h2 className="text-2xl md:text-3xl font-semibold text-pink-800 mb-3">
              Dibuat untuk kamu yang sibuk
            </h2>
            <p className="text-pink-600 max-w-xl mx-auto">
              Setiap fitur dirancang agar kamu merasa didukung — bukan diawasi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {[
              {
                icon: "🗓️",
                title: "Kalender Cerdas",
                desc: "Lihat semua agenda dalam satu tampilan lembut. Setiap acara punya warna yang menenangkan.",
                bgColor: "bg-pink-100",
                textColor: "text-pink-600",
              },
              {
                icon: "✅",
                title: "Tugas Harian",
                desc: "Kelola tugas pribadi, rumah, dan bisnis dalam satu tempat — dengan prioritas yang jelas.",
                bgColor: "bg-rose-100",
                textColor: "text-rose-600",
              },
              {
                icon: "💰",
                title: "Keuangan Sederhana",
                desc: "Catat pemasukan & pengeluaran tanpa ribet. Saldo selalu terlihat, tenang dan transparan.",
                bgColor: "bg-pink-100",
                textColor: "text-pink-600",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="group bg-white p-6 rounded-xl border border-pink-100 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4`}>
                  <span className={`${feature.textColor} text-xl`}>{feature.icon}</span>
                </div>
                <h3 className="text-lg font-semibold text-pink-800 mb-2">{feature.title}</h3>
                <p className="text-pink-600 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Closing CTA */}
        <div className="text-center max-w-3xl mx-auto bg-white p-7 rounded-2xl border border-pink-100 shadow-sm">
          <h3 className="text-xl md:text-2xl font-semibold text-pink-800 mb-3">
            Ruang kecil untuk <span className="text-pink-400">hidup besar</span> milikmu.
          </h3>
          <p className="text-pink-600 mb-6 text-base">
            SheTime bukan sekadar aplikasi — ini tempatmu menata hari, mengenal diri, dan tumbuh dengan lembut setiap hari.
          </p>
          <Link
            href="/dashboard"
            className="inline-block px-7 py-3.5 rounded-full bg-pink-500 text-white font-medium shadow hover:shadow-md transform hover:scale-[1.03] transition-all"
          >
            ✨ Mulai Sekarang
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
  
}