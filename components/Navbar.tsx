'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage, Language } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { t } from '@/lib/translations';
import { Sun, Moon, ChevronDown, Menu, X } from 'lucide-react';

const LANGUAGES: { code: Language; label: string; fullLabel: string; flag: React.ReactNode }[] = [
  { 
    code: 'id', 
    label: 'ID', 
    fullLabel: 'Indonesia', 
    flag: (
      <svg width="18" height="12" viewBox="0 0 18 12" className="rounded-xs overflow-hidden shadow-xs border border-black/10 flex-shrink-0">
        <rect width="18" height="6" fill="#E70011"/>
        <rect y="6" width="18" height="6" fill="#FFFFFF"/>
      </svg>
    ) 
  },
  { 
    code: 'en', 
    label: 'EN', 
    fullLabel: 'English', 
    flag: (
      <svg width="18" height="12" viewBox="0 0 60 30" className="rounded-xs overflow-hidden shadow-xs border border-black/10 flex-shrink-0">
        <clipPath id="uk-s"><path d="M0,0 v30 h60 v-30 z"/></clipPath>
        <clipPath id="uk-t"><path d="M30,15 h30 v15 z M30,15 v-15 h-30 z M30,15 h-30 v15 z M30,15 v-15 h30 z"/></clipPath>
        <g clipPath="url(#uk-s)">
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#012169" strokeWidth="4"/>
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="2" clipPath="url(#uk-t)"/>
          <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10"/>
          <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6"/>
        </g>
      </svg>
    ) 
  },
  { 
    code: 'ko', 
    label: 'KO', 
    fullLabel: '한국어', 
    flag: (
      <svg width="18" height="12" viewBox="0 0 36 24" className="rounded-xs overflow-hidden shadow-xs border border-black/10 flex-shrink-0">
        <rect width="36" height="24" fill="#FFFFFF"/>
        <circle cx="18" cy="12" r="6" fill="#C60C30"/>
        <path d="M12,12 A6,6 0 0,0 24,12 A3,3 0 0,0 18,12 A3,3 0 0,1 12,12" fill="#003478"/>
      </svg>
    ) 
  },
];

export default function Navbar() {
  const { lang, setLang } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const text = t[lang].nav;

  const currentLang = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-[#607D94]/15 bg-white/90 text-[#102B3F] backdrop-blur-md transition-colors duration-300">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Official Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group py-1">
          <img 
            src="/logo.png" 
            alt="PGP Playground Playful Logo" 
            className="h-9 sm:h-10 md:h-12 w-auto object-contain transition-transform group-hover:scale-105"
          />
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wide">
          <Link href="/" className="text-[#102B3F] hover:text-[#3BBBE2] transition-colors">{text.home}</Link>
          <Link href="/#services" className="text-[#607D94] hover:text-[#3BBBE2] transition-colors">{text.services}</Link>
          <Link href="/#portfolio" className="text-[#607D94] hover:text-[#3BBBE2] transition-colors">{text.portfolio}</Link>
          <Link href="/#about" className="text-[#607D94] hover:text-[#3BBBE2] transition-colors">{text.about}</Link>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          {/* Language Dropdown Selector */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 rounded-full border border-[#607D94]/20 bg-[#F4F9FC] text-xs font-semibold text-[#102B3F] hover:border-[#3BBBE2] transition-all cursor-pointer shadow-xs"
              aria-label="Select Language"
            >
              {currentLang.flag}
              <span>{currentLang.label}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-[#607D94] transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} />
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-40 rounded-2xl bg-white border border-[#607D94]/20 shadow-xl py-2 z-50 animate-fadeIn">
                {LANGUAGES.map((item) => (
                  <button
                    key={item.code}
                    onClick={() => {
                      setLang(item.code);
                      setIsLangOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-4 py-2 text-xs font-semibold text-left transition-colors cursor-pointer ${
                      lang === item.code
                        ? 'bg-[#3BBBE2]/15 text-[#1A7B9B]'
                        : 'text-[#102B3F] hover:bg-[#F4F9FC] hover:text-[#3BBBE2]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {item.flag}
                      <span>{item.fullLabel}</span>
                    </div>
                    {lang === item.code && <span className="text-[#3BBBE2] font-bold">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Contact CTA */}
          <Link 
            href="/#contact" 
            className="hidden sm:inline-flex px-5 md:px-6 py-2 text-xs md:text-sm font-semibold rounded-full bg-[#3BBBE2] text-white hover:bg-[#1A7B9B] shadow-md shadow-[#3BBBE2]/25 transition-all transform hover:-translate-y-0.5"
          >
            {text.contact} <span className="ml-1">↗</span>
          </Link>

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-[#102B3F] bg-[#F4F9FC] border border-[#607D94]/20 hover:text-[#3BBBE2] transition-colors cursor-pointer"
            aria-label="Toggle Mobile Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer / Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-[#607D94]/15 bg-white px-6 py-6 space-y-4 animate-fadeIn shadow-xl">
          <div className="flex flex-col space-y-3 font-semibold text-sm">
            <Link 
              href="/" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-[#102B3F] bg-[#F4F9FC] hover:bg-[#3BBBE2] hover:text-white transition-all"
            >
              {text.home}
            </Link>
            <Link 
              href="/#services" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-[#607D94] hover:bg-[#F4F9FC] hover:text-[#102B3F] transition-all"
            >
              {text.services}
            </Link>
            <Link 
              href="/#portfolio" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-[#607D94] hover:bg-[#F4F9FC] hover:text-[#102B3F] transition-all"
            >
              {text.portfolio}
            </Link>
            <Link 
              href="/#about" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-[#607D94] hover:bg-[#F4F9FC] hover:text-[#102B3F] transition-all"
            >
              {text.about}
            </Link>
            <Link 
              href="/#contact" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-3 rounded-xl bg-[#3BBBE2] text-white text-center font-bold shadow-md shadow-[#3BBBE2]/20 transition-all block mt-2"
            >
              {text.contact} ↗
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
