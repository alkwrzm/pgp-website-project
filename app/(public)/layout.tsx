'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LanguageProvider } from '@/context/LanguageContext';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider>
      <Navbar />
      <main className="flex-1 flex flex-col">{children}</main>
      <Footer />
    </LanguageProvider>
  );
}
