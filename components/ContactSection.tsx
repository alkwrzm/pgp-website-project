'use client';

import { Mail, MapPin } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/lib/translations';

export default function ContactSection() {
  const { lang } = useLanguage();
  const text = t[lang].contact;

  return (
    <section id="contact" className="py-24 md:py-36 border-t border-white/10 bg-zinc-950">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <p className="text-xs font-semibold tracking-widest text-white/50 uppercase mb-4">{text.badge}</p>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-white mb-8">
              {text.title}
            </h2>
            <p className="text-white/60 text-base font-light mb-12 leading-relaxed">
              {text.desc}
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs uppercase text-white/40 font-mono">{text.emailUs}</p>
                  <p className="text-lg text-white font-medium">hello@pgpintpacific.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs uppercase text-white/40 font-mono">{text.headquarter}</p>
                  <p className="text-lg text-white font-medium">{text.city}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-black/60 border border-white/10 p-8 rounded-2xl">
            <h3 className="text-2xl font-medium text-white mb-6">{text.formTitle}</h3>
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-xs uppercase font-semibold tracking-wider text-white/60 mb-2">{text.nameLabel}</label>
                <input 
                  type="text" 
                  className="w-full bg-zinc-950 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
                  placeholder={text.namePlaceholder}
                />
              </div>
              <div>
                <label className="block text-xs uppercase font-semibold tracking-wider text-white/60 mb-2">{text.emailLabel}</label>
                <input 
                  type="email" 
                  className="w-full bg-zinc-950 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
                  placeholder={text.emailPlaceholder}
                />
              </div>
              <div>
                <label className="block text-xs uppercase font-semibold tracking-wider text-white/60 mb-2">{text.messageLabel}</label>
                <textarea 
                  rows={4}
                  className="w-full bg-zinc-950 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white transition-colors resize-none"
                  placeholder={text.messagePlaceholder}
                />
              </div>
              <button type="submit" className="w-full bg-white text-black font-medium py-3.5 rounded-xl hover:bg-white/90 transition-colors">
                {text.submitBtn}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
