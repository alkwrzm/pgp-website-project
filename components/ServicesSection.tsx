'use client';

import { Service } from '@prisma/client';
import { useState, useEffect } from 'react';
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
  ChevronDown,
  ChevronUp,
  Maximize2
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { t } from '@/lib/translations';

function ServiceCarousel({
  title,
  images,
  onOpenLightbox,
  previewTitle = 'Preview Produk',
  imageUnit = 'Gambar',
}: {
  title: string;
  images: string[];
  onOpenLightbox: (index: number) => void;
  previewTitle?: string;
  imageUnit?: string;
}) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-play slide effect (every 3.5 seconds) unless hovered
  useEffect(() => {
    if (images.length <= 1 || isHovered) return;

    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % images.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [images.length, isHovered]);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full border border-[#607D94]/15 bg-[#F4F9FC] p-4 md:p-6 rounded-2xl overflow-hidden"
    >
      <div className="flex justify-between items-center gap-2 mb-3 pb-3 border-b border-[#607D94]/15">
        <span className="text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 min-w-0 text-[#102B3F] font-semibold">
          <Images className="w-4 h-4 flex-shrink-0 text-[#3BBBE2]" />
          <span className="truncate">{previewTitle}</span>
        </span>
        <span className="text-xs font-mono text-[#607D94]">
          {currentIdx + 1} / {images.length} {imageUnit}
        </span>
      </div>

      {/* Main Single Photo Showcase (Pure Image Display - No White Canvas) */}
      <div
        onClick={() => onOpenLightbox(currentIdx)}
        className="relative h-64 sm:h-72 md:h-80 w-full rounded-2xl overflow-hidden cursor-pointer group/img transition-all duration-300 flex items-center justify-center bg-transparent"
      >
        <Image
          src={images[currentIdx]}
          alt={`${title} preview ${currentIdx + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 500px"
          className="object-contain transition-transform duration-500 group-hover/img:scale-[1.03]"
        />

        <div className="absolute inset-0 bg-[#102B3F]/30 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
          <span className="px-4 py-2 rounded-full bg-[#102B3F]/80 text-white text-xs font-semibold flex items-center gap-1.5 backdrop-blur-md border border-white/20">
            <Maximize2 className="w-3.5 h-3.5" /> Lightbox
          </span>
        </div>
      </div>

      {/* Bottom Controls Bar (Outside Image Box) */}
      {images.length > 1 && (
        <div className="flex items-center justify-between mt-4 pt-2 border-t border-[#607D94]/15">
          <button
            onClick={handlePrev}
            aria-label="Previous Slide"
            className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-[#607D94]/20 bg-white text-xs font-semibold text-[#102B3F] hover:bg-[#3BBBE2] hover:text-white hover:border-[#3BBBE2] transition-all shadow-xs cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Prev</span>
          </button>

          {/* Pagination Dots */}
          <div className="flex items-center gap-1.5">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIdx(idx);
                }}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIdx === idx ? 'w-6 bg-[#3BBBE2]' : 'w-2 bg-[#607D94]/30 hover:bg-[#607D94]/60'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            aria-label="Next Slide"
            className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-[#607D94]/20 bg-white text-xs font-semibold text-[#102B3F] hover:bg-[#3BBBE2] hover:text-white hover:border-[#3BBBE2] transition-all shadow-xs cursor-pointer"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

export default function ServicesSection({ dynamicServices }: { dynamicServices: Service[] }) {
  const [activeGallery, setActiveGallery] = useState<{ title: string; images: string[]; activeIdx: number } | null>(null);
  const [showAllServices, setShowAllServices] = useState(false);
  const { lang } = useLanguage();
  const text = t[lang].services;
  const serviceItems = (t[lang] as any).serviceItems || {};

  const getServiceData = (service: Service) => {
    const lower = service.title.toLowerCase();
    let item: any = null;
    if (lower.includes('pocketdrop')) item = serviceItems.pocketdrop;
    else if (lower.includes('pic2go')) item = serviceItems.pic2go;
    else if (lower.includes('konser') || lower.includes('concert')) item = serviceItems.concert;
    else if (lower.includes('iklan') || lower.includes('model') || lower.includes('advertising')) item = serviceItems.agency;
    else if (lower.includes('penghubung') || lower.includes('bridge') || lower.includes('perusahaan')) item = serviceItems.bridge;
    else if (lower.includes('influencer')) item = serviceItems.influencer;

    return {
      category: item?.category || service.category,
      title: item?.title || service.title,
      subtitle: item?.subtitle || service.subtitle,
      description: item?.description || service.description,
    };
  };

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

  // Maximum 3 rows limit initially
  // Featured services = 1 row each (2 featured services = 2 rows)
  // Standard services = 3 items per row (3 standard services = 1 row)
  const INITIAL_FEATURED_LIMIT = 2;
  const INITIAL_STANDARD_LIMIT = 3;

  const visibleFeatured = showAllServices ? featuredServices : featuredServices.slice(0, INITIAL_FEATURED_LIMIT);
  const visibleStandard = showAllServices ? standardServices : standardServices.slice(0, INITIAL_STANDARD_LIMIT);

  const hasMoreServices = featuredServices.length > INITIAL_FEATURED_LIMIT || standardServices.length > INITIAL_STANDARD_LIMIT;

  const showMoreLabel =
    lang === 'ko'
      ? '서비스 더보기'
      : lang === 'en'
      ? 'Show More Services'
      : 'Lihat Lebih Banyak Service';

  const showLessLabel =
    lang === 'ko'
      ? '접기'
      : lang === 'en'
      ? 'Show Less'
      : 'Tampilkan Lebih Sedikit';

  return (
    <section id="services" className="py-24 md:py-32 border-t border-[#607D94]/15 bg-[#F4F9FC] text-[#102B3F] transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 text-[#102B3F]">{text.title}</h2>
          <p className="max-w-3xl text-base md:text-lg font-normal leading-relaxed text-[#607D94]">
            {text.desc}
          </p>
        </div>

        <div className="space-y-12">
          {/* FEATURED SERVICES WITH PHOTOS (Highlight Full-Width 1 Row Card) */}
          {visibleFeatured.map((service) => {
            const sData = getServiceData(service);
            return (
              <div
                key={service.id}
                className="rounded-3xl p-6 md:p-10 shadow-xl shadow-[#1A7B9B]/5 relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-[#607D94]/20 bg-white hover:border-[#3BBBE2] hover:shadow-2xl transition-all duration-300"
              >
                {/* Subtle Ambient Glow */}
                <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl pointer-events-none bg-[#3BBBE2]/10" />

                {/* Left Column: Service Details */}
                <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-6">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-2xl border border-[#3BBBE2]/30 bg-[#3BBBE2]/10 text-[#1A7B9B] flex items-center justify-center shadow-inner">
                        {getIcon(service.title)}
                      </div>
                      <span className="px-3 py-1 border border-[#1A7B9B]/20 bg-[#F4F9FC] rounded-full text-xs font-semibold uppercase tracking-wider text-[#1A7B9B]">
                        {sData.category}
                      </span>
                    </div>

                    <h3 className="text-3xl md:text-4xl font-bold mb-2 leading-tight text-[#102B3F]">
                      {sData.title}
                    </h3>

                    {sData.subtitle && (
                      <p className="text-sm font-mono mb-4 text-[#1A7B9B] font-medium">
                        {sData.subtitle}
                      </p>
                    )}

                    {sData.description && (
                      <p className="text-sm md:text-base font-normal leading-relaxed whitespace-pre-line text-[#607D94] text-justify [word-break:keep-all]">
                        {sData.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Right Column: Featured Image Single 1-by-1 Auto Carousel */}
                <div className="lg:col-span-6 w-full">
                  <ServiceCarousel
                    title={sData.title}
                    images={service.images}
                    previewTitle={text.previewTitle}
                    imageUnit={text.imageUnit}
                    onOpenLightbox={(idx) => setActiveGallery({ title: sData.title, images: service.images, activeIdx: idx })}
                  />
                </div>
              </div>
            );
          })}

          {/* STANDARD SERVICES GRID (Services without photos) */}
          {visibleStandard.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
              {visibleStandard.map((service) => {
                const sData = getServiceData(service);
                return (
                  <div
                    key={service.id}
                    className="border border-[#607D94]/20 bg-white p-8 rounded-2xl flex flex-col justify-between hover-lift transition-all duration-300 shadow-sm hover:border-[#3BBBE2]"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-[#3BBBE2]/10 text-[#1A7B9B] flex items-center justify-center mb-6 border border-[#3BBBE2]/20">
                        {getIcon(service.title)}
                      </div>

                      <span className="text-[10px] font-mono uppercase tracking-widest block mb-2 text-[#1A7B9B] font-semibold">
                        {sData.category}
                      </span>
                      <h3 className="text-2xl font-bold mb-2 text-[#102B3F]">{sData.title}</h3>
                      {sData.subtitle && (
                        <p className="text-xs font-mono mb-4 text-[#607D94]">{sData.subtitle}</p>
                      )}
                      {sData.description && (
                        <p className="text-sm font-normal leading-relaxed whitespace-pre-line text-[#607D94] text-justify [word-break:keep-all]">
                          {sData.description}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Show More Services Button */}
          {hasMoreServices && (
            <div className="pt-6 flex justify-center">
              <button
                onClick={() => setShowAllServices(!showAllServices)}
                className="flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm bg-white border border-[#607D94]/20 text-[#102B3F] hover:bg-[#3BBBE2] hover:text-white hover:border-[#3BBBE2] transition-all shadow-md cursor-pointer group"
              >
                <span>{showAllServices ? showLessLabel : showMoreLabel}</span>
                {showAllServices ? (
                  <ChevronUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
                ) : (
                  <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal for Service Photos / App Screenshots */}
      {activeGallery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#102B3F]/80 backdrop-blur-xl p-4 md:p-8">
          <button
            onClick={() => setActiveGallery(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-[#3BBBE2] transition-colors z-50"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="max-w-4xl w-full max-h-[90vh] flex flex-col items-center justify-center bg-[#102B3F] border border-[#3BBBE2]/30 rounded-3xl p-6 relative shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-4 text-center">{activeGallery.title}</h3>

            <div className="relative w-full h-[65vh] flex items-center justify-center bg-[#091B28] rounded-2xl overflow-hidden p-2">
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
                  className="p-2.5 rounded-full bg-[#3BBBE2]/20 text-white hover:bg-[#3BBBE2] transition-colors flex items-center gap-1 text-xs font-semibold"
                >
                  <ChevronLeft className="w-4 h-4" /> Prev
                </button>

                <span className="text-xs text-[#3BBBE2] font-mono">
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
                  className="p-2.5 rounded-full bg-[#3BBBE2]/20 text-white hover:bg-[#3BBBE2] transition-colors flex items-center gap-1 text-xs font-semibold"
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
