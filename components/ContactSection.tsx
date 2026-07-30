'use client';

import { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { t } from '@/lib/translations';

export default function ContactSection() {
  const { lang } = useLanguage();
  const text = t[lang].contact;

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    const subject = encodeURIComponent(`[Website Inquiry] ${formData.name}`);
    const body = encodeURIComponent(
      `Nama / Perusahaan: ${formData.name}\nEmail: ${formData.email}\n\nPesan / Rencana Kolaborasi:\n${formData.message}`
    );

    // Open email client with pre-filled content to pgpintpacific@gmail.com
    window.location.href = `mailto:pgpintpacific@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 md:py-36 border-t border-[#607D94]/15 bg-[#F4F9FC] text-[#102B3F] transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase mb-4 text-[#1A7B9B]">{text.badge}</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-6 sm:mb-8 text-[#102B3F]">
              {text.title}
            </h2>
            <p className="text-sm sm:text-base font-normal mb-8 sm:mb-12 leading-relaxed text-[#607D94]">
              {text.desc}
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-[#3BBBE2]/10 text-[#1A7B9B] border border-[#3BBBE2]/20 flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs uppercase font-mono text-[#607D94]">{text.emailUs}</p>
                  <p className="text-base sm:text-lg font-bold text-[#102B3F] truncate">pgpintpacific@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-[#3BBBE2]/10 text-[#1A7B9B] border border-[#3BBBE2]/20 flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs uppercase font-mono text-[#607D94]">{text.headquarter}</p>
                  <p className="text-base sm:text-lg font-bold text-[#102B3F]">{text.city}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="border border-[#607D94]/20 bg-white p-6 sm:p-8 rounded-3xl shadow-xl shadow-[#1A7B9B]/5">
            <h3 className="text-2xl font-bold mb-6 text-[#102B3F]">{text.formTitle}</h3>
            {submitted ? (
              <div className="p-6 rounded-2xl bg-[#3BBBE2]/10 border border-[#3BBBE2]/30 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#1A7B9B] mx-auto" />
                <h4 className="font-bold text-lg text-[#102B3F]">{text.successTitle}</h4>
                <p className="text-xs text-[#607D94]">
                  {text.successDesc}
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-xs font-semibold text-[#1A7B9B] underline cursor-pointer"
                >
                  {text.sendAnother}
                </button>
              </div>
            ) : (
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-xs uppercase font-semibold tracking-wider mb-2 text-[#102B3F]">
                    {text.nameLabel} *
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-xl px-4 py-3 border border-[#607D94]/25 bg-[#F4F9FC] text-[#102B3F] placeholder-[#607D94]/70 focus:outline-none focus:border-[#3BBBE2] focus:ring-1 focus:ring-[#3BBBE2] transition-colors"
                    placeholder={text.namePlaceholder}
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase font-semibold tracking-wider mb-2 text-[#102B3F]">
                    {text.emailLabel} *
                  </label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-xl px-4 py-3 border border-[#607D94]/25 bg-[#F4F9FC] text-[#102B3F] placeholder-[#607D94]/70 focus:outline-none focus:border-[#3BBBE2] focus:ring-1 focus:ring-[#3BBBE2] transition-colors"
                    placeholder={text.emailPlaceholder}
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase font-semibold tracking-wider mb-2 text-[#102B3F]">
                    {text.messageLabel} *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-xl px-4 py-3 border border-[#607D94]/25 bg-[#F4F9FC] text-[#102B3F] placeholder-[#607D94]/70 focus:outline-none focus:border-[#3BBBE2] focus:ring-1 focus:ring-[#3BBBE2] transition-colors resize-none"
                    placeholder={text.messagePlaceholder}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full font-semibold py-3.5 rounded-xl transition-all shadow-md shadow-[#3BBBE2]/25 bg-[#3BBBE2] text-white hover:bg-[#1A7B9B] transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{text.submitBtn}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
