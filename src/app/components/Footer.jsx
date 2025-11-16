"use client";

import Link from "next/link";
import {
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Heart,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#FFF9FB] border-t border-[#F8BBD0] mt-12 py-8">
      <div className="max-w-6xl mx-auto px-4 text-center">
        {/* Logo / Nama */}
        <div className="mb-4">
          <Link href="/" className="text-[#E91E63] font-bold text-xl md:text-2xl">
            SheTime
          </Link>
          <p className="text-sm text-[#AD1457] mt-1">
            Untuk perempuan yang ingin hidup lebih teratur, tenang, dan bahagia.
          </p>
        </div>

        {/* Sosial Media — Lucide Icons */}
        <div className="flex justify-center gap-5 my-4">
          <Link
            href="https://instagram.com/shetime.id"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#E91E63] hover:text-[#C2185B] transition-colors"
            aria-label="Instagram"
          >
            <Instagram size={20} />
          </Link>
          <Link
            href="https://facebook.com/shetime.id"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#1877F2] hover:text-[#0D5CBB] transition-colors"
            aria-label="Facebook"
          >
            <Facebook size={20} />
          </Link>
          <Link
            href="https://twitter.com/shetime_id"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#1DA1F2] hover:text-[#0D8BD9] transition-colors"
            aria-label="Twitter"
          >
            <Twitter size={20} />
          </Link>
          <Link
            href="https://linkedin.com/company/shetime"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0A66C2] hover:text-[#084F9A] transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </Link>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-4 border-t border-[#F8BBD0]">
          <p className="text-xs text-[#AD1457]">
            © {new Date().getFullYear()} SheTime. All rights reserved.
          </p>
          <p className="text-xs text-[#AD1457] mt-1">
            Dibuat dengan <Heart size={12} className="inline text-[#E91E63] mx-1" />
            oleh perempuan, untuk perempuan.
          </p>
        </div>
      </div>
    </footer>
  );
}