'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/lib/translations';

export default function Navbar() {
  const { lang, setLang } = useLanguage();
  const text = t[lang].nav;

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-white/10 bg-black/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Clean Typography Brand Header */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-xl md:text-2xl font-bold tracking-tighter text-white group-hover:text-white/80 transition-colors font-sans">
            PGP <span className="font-light text-white/70">INT PACIFIC</span>
          </span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
          <Link href="/" className="text-white/70 hover:text-white transition-colors">{text.home}</Link>
          <Link href="/#services" className="text-white/70 hover:text-white transition-colors">{text.services}</Link>
          <Link href="/#portfolio" className="text-white/70 hover:text-white transition-colors">{text.portfolio}</Link>
          <Link href="/#about" className="text-white/70 hover:text-white transition-colors">{text.about}</Link>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Language Toggle ID / EN */}
          <div className="flex items-center bg-white/10 p-1 rounded-full border border-white/10 text-xs">
            <button
              onClick={() => setLang('id')}
              className={`px-3 py-1 rounded-full font-medium transition-all ${
                lang === 'id'
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              ID
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-3 py-1 rounded-full font-medium transition-all ${
                lang === 'en'
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              EN
            </button>
          </div>

          <Link href="/#contact" className="px-6 py-2 bg-white text-black text-sm font-medium rounded-full hover:bg-white/90 transition-colors">
            {text.contact} <span className="ml-1">↗</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
