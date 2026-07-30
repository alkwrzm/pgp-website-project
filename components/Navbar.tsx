'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { t } from '@/lib/translations';
import { Sun, Moon } from 'lucide-react';

export default function Navbar() {
  const { lang, setLang } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const text = t[lang].nav;

  const isLight = theme === 'light';

  return (
    <nav className={`sticky top-0 z-40 w-full border-b transition-colors duration-300 ${
      isLight 
        ? 'border-slate-200 bg-white/80 text-slate-900 backdrop-blur-md' 
        : 'border-white/10 bg-black/80 text-white backdrop-blur-md'
    }`}>
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Clean Typography Brand Header */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className={`text-xl md:text-2xl font-bold tracking-tighter transition-colors font-sans ${
            isLight ? 'text-slate-900 group-hover:text-slate-700' : 'text-white group-hover:text-white/80'
          }`}>
            PGP <span className={`font-light ${isLight ? 'text-slate-600' : 'text-white/70'}`}>INT PACIFIC</span>
          </span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
          <Link href="/" className={`transition-colors ${isLight ? 'text-slate-600 hover:text-slate-900' : 'text-white/70 hover:text-white'}`}>{text.home}</Link>
          <Link href="/#services" className={`transition-colors ${isLight ? 'text-slate-600 hover:text-slate-900' : 'text-white/70 hover:text-white'}`}>{text.services}</Link>
          <Link href="/#portfolio" className={`transition-colors ${isLight ? 'text-slate-600 hover:text-slate-900' : 'text-white/70 hover:text-white'}`}>{text.portfolio}</Link>
          <Link href="/#about" className={`transition-colors ${isLight ? 'text-slate-600 hover:text-slate-900' : 'text-white/70 hover:text-white'}`}>{text.about}</Link>
        </div>
        
        <div className="flex items-center gap-3 md:gap-4">
          {/* Theme Toggle Sun / Moon */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className={`p-2 rounded-full border transition-all ${
              isLight 
                ? 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200' 
                : 'bg-white/10 border-white/10 text-white hover:bg-white/20'
            }`}
          >
            {isLight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-300" />}
          </button>

          {/* Language Toggle ID / EN */}
          <div className={`flex items-center p-1 rounded-full border text-xs ${
            isLight ? 'bg-slate-100 border-slate-200' : 'bg-white/10 border-white/10'
          }`}>
            <button
              onClick={() => setLang('id')}
              className={`px-3 py-1 rounded-full font-medium transition-all ${
                lang === 'id'
                  ? isLight ? 'bg-slate-900 text-white font-semibold' : 'bg-white text-black font-semibold shadow-sm'
                  : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-white/60 hover:text-white'
              }`}
            >
              ID
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-3 py-1 rounded-full font-medium transition-all ${
                lang === 'en'
                  ? isLight ? 'bg-slate-900 text-white font-semibold' : 'bg-white text-black font-semibold shadow-sm'
                  : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-white/60 hover:text-white'
              }`}
            >
              EN
            </button>
          </div>

          <Link 
            href="/#contact" 
            className={`px-6 py-2 text-sm font-medium rounded-full transition-colors ${
              isLight 
                ? 'bg-slate-900 text-white hover:bg-slate-800' 
                : 'bg-white text-black hover:bg-white/90'
            }`}
          >
            {text.contact} <span className="ml-1">↗</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
