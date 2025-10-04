"use client";

import Link from "next/link";
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-pink-50 via-purple-50 to-indigo-50 border-t border-white/50 mt-12 py-8">
      <div className="max-w-6xl mx-auto px-4 text-center">
        {/* Logo / Nama */}
        <div className="mb-4">
          <Link href="/dashboard" className="text-pink-600 font-bold text-xl md:text-2xl">
            SheTime ✨
          </Link>
          <p className="text-sm text-gray-600 mt-1">
            Untuk perempuan yang ingin hidup lebih teratur, tenang, dan bahagia.
          </p>
        </div>

        {/* Sosial Media */}
        <div className="flex justify-center gap-4 my-4">
          <Link
            href="https://instagram.com/shetime.id"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-600 hover:text-pink-800 transition-colors"
            aria-label="Instagram"
          >
            <FaInstagram size={20} />
          </Link>
          <Link
            href="https://facebook.com/shetime.id"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 transition-colors"
            aria-label="Facebook"
          >
            <FaFacebook size={20} />
          </Link>
          <Link
            href="https://twitter.com/shetime_id"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-500 hover:text-sky-700 transition-colors"
            aria-label="Twitter"
          >
            <FaTwitter size={20} />
          </Link>
          <Link
            href="https://linkedin.com/company/shetime"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-800 transition-colors"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={20} />
          </Link>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-4 border-t border-white/40">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} SheTime. All rights reserved.
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Dibuat dengan 💖 oleh perempuan, untuk perempuan.
          </p>
        </div>
      </div>
    </footer>
  );
}