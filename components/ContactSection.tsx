'use client';

import { Mail, MapPin } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { t } from '@/lib/translations';

export default function ContactSection() {
  const { lang } = useLanguage();
  const { theme } = useTheme();
  const text = t[lang].contact;
  const isLight = theme === 'light';

  return (
    <section id="contact" className={`py-24 md:py-36 border-t transition-colors duration-300 ${isLight ? 'bg-slate-100 border-slate-200 text-slate-900' : 'bg-zinc-950 border-white/10 text-white'
      }`}>
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <p className={`text-xs font-semibold tracking-widest uppercase mb-4 ${isLight ? 'text-slate-500' : 'text-white/50'}`}>{text.badge}</p>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-8">
              {text.title}
            </h2>
            <p className={`text-base font-light mb-12 leading-relaxed ${isLight ? 'text-slate-600' : 'text-white/60'}`}>
              {text.desc}
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isLight ? 'bg-slate-200 text-slate-800' : 'bg-white/10 text-white'
                  }`}>
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className={`text-xs uppercase font-mono ${isLight ? 'text-slate-400' : 'text-white/40'}`}>{text.emailUs}</p>
                  <p className="text-lg font-medium">pgpintpacific@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isLight ? 'bg-slate-200 text-slate-800' : 'bg-white/10 text-white'
                  }`}>
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className={`text-xs uppercase font-mono ${isLight ? 'text-slate-400' : 'text-white/40'}`}>{text.headquarter}</p>
                  <p className="text-lg font-medium">{text.city}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`border p-8 rounded-2xl shadow-xl transition-colors ${isLight ? 'bg-white border-slate-200' : 'bg-black/60 border-white/10'
            }`}>
            <h3 className="text-2xl font-medium mb-6">{text.formTitle}</h3>
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className={`block text-xs uppercase font-semibold tracking-wider mb-2 ${isLight ? 'text-slate-600' : 'text-white/60'
                  }`}>{text.nameLabel}</label>
                <input
                  type="text"
                  className={`w-full rounded-xl px-4 py-3 border focus:outline-none transition-colors ${isLight
                      ? 'bg-slate-50 border-slate-200 text-slate-900 focus:border-slate-800'
                      : 'bg-zinc-950 border-white/20 text-white focus:border-white'
                    }`}
                  placeholder={text.namePlaceholder}
                />
              </div>
              <div>
                <label className={`block text-xs uppercase font-semibold tracking-wider mb-2 ${isLight ? 'text-slate-600' : 'text-white/60'
                  }`}>{text.emailLabel}</label>
                <input
                  type="email"
                  className={`w-full rounded-xl px-4 py-3 border focus:outline-none transition-colors ${isLight
                      ? 'bg-slate-50 border-slate-200 text-slate-900 focus:border-slate-800'
                      : 'bg-zinc-950 border-white/20 text-white focus:border-white'
                    }`}
                  placeholder={text.emailPlaceholder}
                />
              </div>
              <div>
                <label className={`block text-xs uppercase font-semibold tracking-wider mb-2 ${isLight ? 'text-slate-600' : 'text-white/60'
                  }`}>{text.messageLabel}</label>
                <textarea
                  rows={4}
                  className={`w-full rounded-xl px-4 py-3 border focus:outline-none transition-colors resize-none ${isLight
                      ? 'bg-slate-50 border-slate-200 text-slate-900 focus:border-slate-800'
                      : 'bg-zinc-950 border-white/20 text-white focus:border-white'
                    }`}
                  placeholder={text.messagePlaceholder}
                />
              </div>
              <button
                type="submit"
                className={`w-full font-medium py-3.5 rounded-xl transition-colors shadow-lg ${isLight
                    ? 'bg-slate-900 text-white hover:bg-slate-800 shadow-slate-900/10'
                    : 'bg-white text-black hover:bg-white/90 shadow-white/5'
                  }`}
              >
                {text.submitBtn}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
