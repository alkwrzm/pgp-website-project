'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'id' | 'en' | 'ko';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'id',
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('id');

  useEffect(() => {
    const saved = localStorage.getItem('pgp_lang') as Language;
    if (saved === 'id' || saved === 'en' || saved === 'ko') {
      setLangState(saved);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('pgp_lang', newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
