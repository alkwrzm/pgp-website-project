'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LanguageProvider } from '@/context/LanguageContext';
import { ThemeProvider } from '@/context/ThemeContext';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </LanguageProvider>
    </ThemeProvider>
  );
}
