'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { t } from '@/lib/translations';

export default function Footer() {
  const { lang } = useLanguage();
  const { theme } = useTheme();
  const text = t[lang].footer;
  const isLight = theme === 'light';

  return (
    <footer className={`w-full border-t py-12 md:py-24 transition-colors duration-300 ${
      isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-black border-white/10 text-white'
    }`}>
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <Link href="/" className="flex items-center gap-2 mb-6">
            <span className="text-2xl font-bold tracking-tighter">PGP INT PACIFIC</span>
          </Link>
          <p className={`max-w-sm text-sm font-light leading-relaxed ${isLight ? 'text-slate-600' : 'text-white/60'}`}>
            {text.desc}
          </p>
        </div>
        
        <div>
          <h4 className="font-medium mb-6 tracking-wide text-xs uppercase font-mono">{text.services}</h4>
          <ul className={`space-y-3 text-sm font-light ${isLight ? 'text-slate-600' : 'text-white/60'}`}>
            <li><Link href="/#services" className="hover:opacity-100 transition-colors">PocketDrop (Aplikasi)</Link></li>
            <li><Link href="/#services" className="hover:opacity-100 transition-colors">PIC2GO (Kiosk Photo)</Link></li>
            <li><Link href="/#services" className="hover:opacity-100 transition-colors">Konser & Fanmeeting K-Pop</Link></li>
            <li><Link href="/#services" className="hover:opacity-100 transition-colors">Agensi Iklan & Influencer</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-medium mb-6 tracking-wide text-xs uppercase font-mono">{text.company}</h4>
          <ul className={`space-y-3 text-sm font-light ${isLight ? 'text-slate-600' : 'text-white/60'}`}>
            <li><Link href="/#about" className="hover:opacity-100 transition-colors">About Us</Link></li>
            <li><Link href="/#portfolio" className="hover:opacity-100 transition-colors">Selected Portfolio</Link></li>
            <li><Link href="/#contact" className="hover:opacity-100 transition-colors">Contact Us</Link></li>
          </ul>
        </div>
      </div>
      <div className={`container mx-auto px-4 mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center text-xs ${
        isLight ? 'border-slate-200 text-slate-400' : 'border-white/10 text-white/40'
      }`}>
        <p>© {new Date().getFullYear()} PT PGP INT PACIFIC. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Link href="#" className="hover:opacity-100 transition-colors">{text.privacy}</Link>
          <Link href="#" className="hover:opacity-100 transition-colors">{text.terms}</Link>
        </div>
      </div>
    </footer>
  );
}
