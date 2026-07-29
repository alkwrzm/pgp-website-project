'use client';

import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/lib/translations';

export default function HeroSection() {
  const { lang } = useLanguage();
  const text = t[lang].hero;

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-16 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-black to-black -z-10" />
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-10 flex flex-col items-start gap-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.1] text-white">
            {text.title1} <br />
            <span className="text-white/50">{text.title2}</span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-3xl font-light leading-relaxed">
            {text.desc}
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-2">
            <a href="#portfolio" className="group flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-white/90 transition-all shadow-xl shadow-white/5">
              {text.ctaPortfolio}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#contact" className="px-8 py-4 text-white font-medium hover:text-white/70 transition-colors">
              {text.ctaContact}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
