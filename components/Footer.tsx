'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { t } from '@/lib/translations';

export default function Footer() {
  const { lang } = useLanguage();
  const text = t[lang].footer;

  return (
    <footer className="w-full border-t border-[#3BBBE2]/20 py-12 md:py-24 bg-[#102B3F] text-white transition-colors duration-300">
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
        <div className="sm:col-span-2 md:col-span-2">
          <Link href="/" className="flex items-center gap-2 mb-6 group inline-block bg-white/95 px-3 py-2 rounded-xl border border-white/20 shadow-md">
            <img 
              src="/logo.png" 
              alt="PGP Playground Playful Logo" 
              className="h-8 sm:h-9 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </Link>
          <p className="max-w-sm text-sm font-normal leading-relaxed text-slate-300">
            {text.desc}
          </p>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4 sm:mb-6 tracking-wide text-xs uppercase font-mono text-[#3BBBE2]">{text.services}</h4>
          <ul className="space-y-3 text-sm font-normal text-slate-300">
            <li><Link href="/#services" className="hover:text-[#3BBBE2] transition-colors">PocketDrop (Aplikasi)</Link></li>
            <li><Link href="/#services" className="hover:text-[#3BBBE2] transition-colors">PIC2GO (Kiosk Photo)</Link></li>
            <li><Link href="/#services" className="hover:text-[#3BBBE2] transition-colors">Konser & Fanmeeting K-Pop</Link></li>
            <li><Link href="/#services" className="hover:text-[#3BBBE2] transition-colors">Agensi Iklan & Influencer</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4 sm:mb-6 tracking-wide text-xs uppercase font-mono text-[#3BBBE2]">{text.company}</h4>
          <ul className="space-y-3 text-sm font-normal text-slate-300">
            <li><Link href="/#about" className="hover:text-[#3BBBE2] transition-colors">About Us</Link></li>
            <li><Link href="/#portfolio" className="hover:text-[#3BBBE2] transition-colors">Selected Portfolio</Link></li>
            <li><Link href="/#contact" className="hover:text-[#3BBBE2] transition-colors">Contact Us</Link></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-center md:text-left text-xs text-slate-400 font-mono">
        <p>© {new Date().getFullYear()} PT PGP INT PACIFIC. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Link href="#" className="hover:text-[#3BBBE2] transition-colors">{text.privacy}</Link>
          <Link href="#" className="hover:text-[#3BBBE2] transition-colors">{text.terms}</Link>
        </div>
      </div>
    </footer>
  );
}
