'use client';

import { useState } from 'react';
import Image from 'next/image';
import { 
  Sparkles, 
  Smartphone, 
  Printer, 
  Ticket, 
  Megaphone, 
  Globe, 
  Users, 
  Images, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Maximize2
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/lib/translations';

export interface ServiceData {
  id: string;
  title: string;
  subtitle?: string | null;
  category: string;
  description?: string | null;
  images: string[];
}

export default function ServicesSection({ dynamicServices }: { dynamicServices: ServiceData[] }) {
  const [activeGallery, setActiveGallery] = useState<{ title: string; images: string[]; activeIdx: number } | null>(null);
  const { lang } = useLanguage();
  const text = t[lang].services;

  // Helper to select icon based on title/category
  const getIcon = (title: string) => {
    const lower = title.toLowerCase();
    if (lower.includes('pocketdrop') || lower.includes('aplikasi') || lower.includes('photocard')) return <Smartphone className="w-6 h-6" />;
    if (lower.includes('pic2go') || lower.includes('kiosk') || lower.includes('printer')) return <Printer className="w-6 h-6" />;
    if (lower.includes('konser') || lower.includes('fanmeeting') || lower.includes('ticket')) return <Ticket className="w-6 h-6" />;
    if (lower.includes('iklan') || lower.includes('model')) return <Megaphone className="w-6 h-6" />;
    if (lower.includes('penghubung') || lower.includes('perusahaan')) return <Globe className="w-6 h-6" />;
    if (lower.includes('influencer')) return <Users className="w-6 h-6" />;
    return <Sparkles className="w-6 h-6" />;
  };

  // Separate services with photos (Featured) from services without photos
  const featuredServices = dynamicServices.filter(s => s.images && s.images.length > 0);
  const standardServices = dynamicServices.filter(s => !s.images || s.images.length === 0);

  return (
    <section id="services" className="py-24 md:py-32 border-t border-white/10 bg-zinc-950">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-16">
          <p className="text-xs font-semibold tracking-widest text-white/50 uppercase mb-4">{text.badge}</p>
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-6">{text.title}</h2>
          <p className="text-white/60 max-w-3xl text-base md:text-lg font-light leading-relaxed">
            {text.desc}
          </p>
        </div>

        <div className="space-y-12">
          {/* FEATURED SERVICES WITH PHOTOS (Highlight Full-Width 1 Row Card) */}
          {featuredServices.map((service) => (
            <div 
              key={service.id}
              className="bg-black border border-white/15 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group hover:border-white/30 transition-all duration-300"
            >
              {/* Subtle Ambient Glow */}
              <div className="absolute -top-24 -right-24 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />

              {/* Left Column: Service Details */}
              <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-6">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-white shadow-inner">
                      {getIcon(service.title)}
                    </div>
                    <span className="px-3 py-1 bg-white/10 border border-white/10 rounded-full text-xs font-semibold uppercase tracking-wider text-white/80">
                      {service.category}
                    </span>
                  </div>

                  <h3 className="text-3xl md:text-4xl font-semibold text-white mb-2 leading-tight">
                    {service.title}
                  </h3>

                  {service.subtitle && (
                    <p className="text-sm font-mono text-amber-300/90 mb-4">
                      {service.subtitle}
                    </p>
                  )}

                  {service.description && (
                    <p className="text-white/70 text-sm md:text-base font-light leading-relaxed whitespace-pre-line">
                      {service.description}
                    </p>
                  )}
                </div>

                <div className="pt-4 flex items-center gap-4">
                  <button
                    onClick={() => setActiveGallery({ title: service.title, images: service.images, activeIdx: 0 })}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-medium text-xs md:text-sm hover:bg-white/90 transition-all shadow-lg shadow-white/5"
                  >
                    <Maximize2 className="w-4 h-4" />
                    <span>{text.viewGallery} ({service.images.length})</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Featured Image Gallery Side Showcase */}
              <div className="lg:col-span-6 bg-zinc-950/80 border border-white/10 p-6 rounded-2xl relative">
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-white/10">
                  <span className="text-xs font-mono text-white/50 uppercase tracking-widest flex items-center gap-1.5">
                    <Images className="w-4 h-4 text-white/70" />
                    {text.previewTitle}
                  </span>
                  <span className="text-xs text-white/40 font-mono">{service.images.length} Gambar</span>
                </div>

                {/* Horizontal / Grid Preview Showcase */}
                <div className="grid grid-cols-3 gap-3">
                  {service.images.slice(0, 3).map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => setActiveGallery({ title: service.title, images: service.images, activeIdx: idx })}
                      className="relative aspect-[9/16] bg-black rounded-xl overflow-hidden border border-white/15 cursor-pointer group/img transition-all duration-300 hover:scale-105 hover:border-white/50 shadow-xl"
                    >
                      <Image
                        src={img}
                        alt={`${service.title} screenshot ${idx + 1}`}
                        fill
                        sizes="250px"
                        className="object-contain p-1"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                        <Maximize2 className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* STANDARD SERVICES GRID (Services without photos) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
            {standardServices.map((service) => (
              <div 
                key={service.id}
                className="bg-black border border-white/10 p-8 rounded-2xl flex flex-col justify-between hover-lift"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white mb-6">
                    {getIcon(service.title)}
                  </div>

                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-2">
                    {service.category}
                  </span>
                  <h3 className="text-2xl font-medium text-white mb-2">{service.title}</h3>
                  {service.subtitle && (
                    <p className="text-xs text-white/60 font-mono mb-4">{service.subtitle}</p>
                  )}
                  {service.description && (
                    <p className="text-white/60 text-sm font-light leading-relaxed whitespace-pre-line">
                      {service.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Service Photos / App Screenshots */}
      {activeGallery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 md:p-8">
          <button
            onClick={() => setActiveGallery(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-50"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="max-w-4xl w-full max-h-[90vh] flex flex-col items-center justify-center bg-zinc-950 border border-white/15 rounded-3xl p-6 relative shadow-2xl">
            <h3 className="text-xl font-medium text-white mb-4 text-center">{activeGallery.title}</h3>
            
            <div className="relative w-full h-[65vh] flex items-center justify-center bg-black rounded-2xl overflow-hidden p-2">
              <Image
                src={activeGallery.images[activeGallery.activeIdx]}
                alt="App Screenshot"
                fill
                sizes="900px"
                className="object-contain"
              />
            </div>

            {/* Carousel Navigation */}
            {activeGallery.images.length > 1 && (
              <div className="flex items-center justify-between w-full mt-4 px-4">
                <button
                  onClick={() =>
                    setActiveGallery((prev) =>
                      prev
                        ? {
                            ...prev,
                            activeIdx: (prev.activeIdx - 1 + prev.images.length) % prev.images.length,
                          }
                        : null
                    )
                  }
                  className="p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors flex items-center gap-1 text-xs font-medium"
                >
                  <ChevronLeft className="w-4 h-4" /> Prev
                </button>

                <span className="text-xs text-white/60 font-mono">
                  {activeGallery.activeIdx + 1} / {activeGallery.images.length}
                </span>

                <button
                  onClick={() =>
                    setActiveGallery((prev) =>
                      prev
                        ? {
                            ...prev,
                            activeIdx: (prev.activeIdx + 1) % prev.images.length,
                          }
                        : null
                    )
                  }
                  className="p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors flex items-center gap-1 text-xs font-medium"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
