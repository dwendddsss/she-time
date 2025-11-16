"use client";
import Link from "next/link";
import {
  CalendarDays,
  ListChecks,
  PiggyBank,
  Heart,
  Feather,
} from "lucide-react";
import { motion } from "framer-motion";
import Footer from "./components/Footer";

const features = [
  {
    icon: CalendarDays,
    title: "Kalender Tenang",
    desc: "Agenda harianmu tersusun rapi, dengan ruang untuk napas — bukan hanya jadwal.",
  },
  {
    icon: ListChecks,
    title: "Daftar Harapan",
    desc: "Tugas bukan beban. Atur prioritas dengan lembut, centang satu per satu.",
  },
  {
    icon: PiggyBank,
    title: "Catatan Keuangan",
    desc: "Pahami arus uangmu tanpa rumus rumit. Transparan, tenang, penuh kendali.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FFF9FB] text-[#C2185B] relative overflow-hidden">
      {/* Decorative floating shapes — subtle & soft */}
      <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[#FCE4EC] opacity-30 blur-2xl"></div>
      <div className="absolute -bottom-32 -left-24 w-80 h-80 rounded-full bg-[#F8BBD0] opacity-20 blur-2xl"></div>

      <div className="container mx-auto px-6 py-16 md:py-24 relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-28"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-1.5 mb-6 bg-[#FCE4EC] text-[#E91E63] rounded-lg text-sm font-medium border border-[#F8BBD0]"
          >
            Untuk perempuan yang ingin tumbuh dengan tenang
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="block">Waktumu,</span>
            <span className="block mt-2 text-[#E91E63]">Milikmu.</span>
          </h1>

          <motion.p
            className="text-lg text-[#AD1457]/90 mb-10 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            SheTime adalah ruang pribadimu untuk menata hari, mencatat mimpi kecil,  
            dan merawat diri — tanpa tekanan, penuh kelembutan.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.99 }}>
              <Link
                href="/dashboard"
                className="px-8 py-4 bg-[#E91E63] text-white font-semibold rounded-lg shadow-sm hover:shadow transition-all duration-200"
              >
                Mulai Sekarang — Gratis
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.99 }}>
              <Link
                href="#fitur"
                className="px-8 py-4 bg-white text-[#C2185B] font-semibold border border-[#F8BBD0] rounded-lg hover:bg-[#FFF0F5] transition-colors"
              >
                Lihat Fitur
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Feature Section */}
        <motion.div
          id="fitur"
          className="max-w-6xl mx-auto mb-28"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-[#C2185B] mb-4">
              Dirancang untuk Jiwa yang Sibuk tapi Ingin Tenang
            </h2>
            <p className="text-[#AD1457] max-w-xl mx-auto">
              Setiap fitur lahir dari percakapan dengan perempuan seperti kamu.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                className="bg-white p-7 rounded-xl border border-[#F8BBD0] shadow-sm hover:shadow-md transition-shadow duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.2 }}
                whileHover={{ y: -6 }}
              >
                <div className="w-12 h-12 bg-[#FCE4EC] rounded-lg flex items-center justify-center mb-5">
                  <feature.icon className="w-6 h-6 text-[#E91E63]" />
                </div>
                <h3 className="text-lg font-bold text-[#C2185B] mb-3">{feature.title}</h3>
                <p className="text-[#AD1457] text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Philosophy Section */}
        <motion.div
          className="max-w-4xl mx-auto text-center mb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#FCE4EC] rounded-full mb-6 mx-auto">
            <Feather className="w-8 h-8 text-[#E91E63]" />
          </div>
          <h3 className="text-2xl font-bold text-[#C2185B] mb-5">
            SheTime percaya:
          </h3>
          <p className="text-lg text-[#AD1457] max-w-3xl mx-auto leading-relaxed px-2">
            Produktivitas bukan tentang mengejar sempurna.  
            Tapi tentang memberi ruang pada diri sendiri untuk tumbuh perlahan,  
            dengan kelembutan dan perhatian penuh.
          </p>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          className="text-center max-w-3xl mx-auto bg-white p-8 rounded-xl border border-[#F8BBD0]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-bold text-[#C2185B] mb-4">
            Waktumu berharga.  
            <br />
            <span className="text-[#E91E63]">Rawatlah dengan lembut.</span>
          </h3>
          <p className="text-[#AD1457] mb-8">
            Gabung ribuan perempuan yang sudah menemukan ketenangan dalam rutinitas mereka.
          </p>
          <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.99 }}>
            <Link
              href="/dashboard"
              className="px-8 py-4 bg-[#E91E63] text-white font-semibold rounded-lg shadow-sm hover:shadow transition-all"
            >
              Mulai Petualangan Tenangmu
            </Link>
          </motion.div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}