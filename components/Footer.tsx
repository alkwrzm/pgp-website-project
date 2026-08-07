'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { t } from '@/lib/translations';

export default function Footer() {
  const { lang } = useLanguage();
  const text = t[lang].footer;
  const navText = t[lang].nav;
  const portfolioText = t[lang].portfolio;

  const serviceLinks = lang === 'ko' ? [
    { label: 'PocketDrop (앱 / 온\u2060라\u2060인)', href: '/#services' },
    { label: 'PIC2GO (키오스크 / 오\u2060프\u2060라\u2060인)', href: '/#services' },
    { label: 'K-Pop 콘서트와 팬미팅', href: '/#services' },
    { label: '광고 및 모델 에이전시', href: '/#services' },
    { label: '인플루언서 콜라보레이션', href: '/#services' },
  ] : lang === 'en' ? [
    { label: 'PocketDrop (Application / Online)', href: '/#services' },
    { label: 'PIC2GO (Kiosk / Offline)', href: '/#services' },
    { label: 'K-Pop Concert & Fanmeeting', href: '/#services' },
    { label: 'Advertising/Talent Agency', href: '/#services' },
    { label: 'Collaboration with Influencer', href: '/#services' },
  ] : [
    { label: 'PocketDrop (Aplikasi / Online)', href: '/#services' },
    { label: 'PIC2GO (Kiosk / Offline)', href: '/#services' },
    { label: 'Konser dan Fanmeeting K-Pop', href: '/#services' },
    { label: 'Agensi Iklan/Model', href: '/#services' },
    { label: 'Kerjasama Influencer', href: '/#services' },
  ];

  const companyLinks = lang === 'ko' ? [
    { label: '회사 소개', href: '/#about' },
    { label: '포토폴리오', href: '/#portfolio' },
    { label: '문의하기', href: '/#contact' },
  ] : lang === 'en' ? [
    { label: 'About Us', href: '/#about' },
    { label: 'Portfolio', href: '/#portfolio' },
    { label: 'Contact Us', href: '/#contact' },
  ] : [
    { label: 'Tentang Kami', href: '/#about' },
    { label: 'Portfolio', href: '/#portfolio' },
    { label: 'Hubungi Kami', href: '/#contact' },
  ];

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
          <p className="max-w-sm text-sm font-normal leading-relaxed text-slate-300 [word-break:keep-all]">
            {text.desc}
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-4 sm:mb-6 tracking-wide text-xs uppercase font-mono text-[#3BBBE2]">{text.services}</h4>
          <ul className="space-y-2.5 text-sm font-normal text-slate-300">
            {serviceLinks.map((link, idx) => (
              <li key={idx}>
                <Link href={link.href} className="hover:text-[#3BBBE2] transition-colors">{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 sm:mb-6 tracking-wide text-xs uppercase font-mono text-[#3BBBE2]">{text.company}</h4>
          <ul className="space-y-2.5 text-sm font-normal text-slate-300">
            {companyLinks.map((link, idx) => (
              <li key={idx}>
                <Link href={link.href} className="hover:text-[#3BBBE2] transition-colors">{link.label}</Link>
              </li>
            ))}
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
