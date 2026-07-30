'use client';

import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { t } from '@/lib/translations';

export default function HeroSection() {
  const { lang } = useLanguage();
  const { theme } = useTheme();
  const text = t[lang].hero;
  const isLight = theme === 'light';

  return (
    <section className={`relative min-h-[90vh] flex items-center justify-center pt-16 overflow-hidden transition-colors duration-300 ${isLight ? 'bg-slate-50 text-slate-900' : 'bg-black text-white'
      }`}>
      <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] -z-10 ${isLight ? 'from-slate-200/60 via-slate-50 to-slate-50' : 'from-white/10 via-black to-black'
        }`} />

      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-10 flex flex-col items-start gap-8">

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.1]">
            {text.title1} <br />
            <span className={isLight ? 'text-slate-500' : 'text-white/50'}>{text.title2}</span>
          </h1>

          <p className={`text-lg md:text-xl max-w-3xl font-light leading-relaxed ${isLight ? 'text-slate-600' : 'text-white/60'
            }`}>
            {text.desc}
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-2">
            <a
              href="#portfolio"
              className={`group flex items-center gap-2 px-8 py-4 rounded-full font-medium transition-all shadow-xl ${isLight
                ? 'bg-slate-900 text-white hover:bg-slate-800 shadow-slate-900/10'
                : 'bg-white text-black hover:bg-white/90 shadow-white/5'
                }`}
            >
              {text.ctaPortfolio}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#contact"
              className={`px-8 py-4 font-medium transition-colors ${isLight ? 'text-slate-700 hover:text-slate-900' : 'text-white hover:text-white/70'
                }`}
            >
              {text.ctaContact}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
