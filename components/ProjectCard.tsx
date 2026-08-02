import Image from 'next/image';
import { useState } from 'react';
import { X, Calendar, Tag, Maximize2, ChevronLeft, ChevronRight, Images } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/lib/translations';

interface ProjectCardProps {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  images?: string[];
  eventDate?: string | Date;
  description?: string | null;
}

export default function ProjectCard({ title, category, imageUrl, images, eventDate, description }: ProjectCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const { lang } = useLanguage();
  const photoUnit = t[lang]?.portfolio?.photoUnit || 'Foto';

  // Combine primary imageUrl with any additional gallery images, preserving uniqueness
  const rawList = images && images.length > 0 ? images : [imageUrl];
  const allImages = Array.from(new Set([imageUrl, ...rawList])).filter(Boolean);

  const formattedDate = eventDate
    ? new Date(eventDate).toLocaleDateString(lang === 'ko' ? 'ko-KR' : lang === 'en' ? 'en-US' : 'id-ID', { year: 'numeric', month: 'long', day: 'numeric' })
    : null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev + 1) % allImages.length);
  };

  return (
    <>
      {/* Project Poster Card - Compact True Ratio Display */}
      <div 
        onClick={() => {
          setActiveIdx(0);
          setIsOpen(true);
        }}
        className="group cursor-pointer flex flex-col rounded-2xl overflow-hidden hover-lift transition-all duration-300 border border-[#607D94]/20 bg-white hover:border-[#3BBBE2] shadow-sm hover:shadow-md"
      >
        <div className="relative w-full h-[280px] sm:h-[340px] md:h-[390px] overflow-hidden flex items-center justify-center p-3 bg-[#F4F9FC]">
          <img
            src={imageUrl}
            alt={title}
            className="max-h-full max-w-full object-contain rounded-lg transition-transform duration-500 group-hover:scale-[1.03] shadow-md"
            loading="lazy"
          />
          {allImages.length > 1 && (
            <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#102B3F]/80 text-white text-[10px] font-mono font-semibold flex items-center gap-1 backdrop-blur-md border border-white/20 shadow-md">
              <Images className="w-3 h-3 text-[#3BBBE2]" />
              <span>{allImages.length} {photoUnit}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-[#102B3F]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="px-3.5 py-1.5 rounded-full bg-white/90 text-[#102B3F] text-xs font-semibold flex items-center gap-1.5 shadow-md">
              <Maximize2 className="w-3.5 h-3.5 text-[#3BBBE2]" />
              Perbesar & Galeri
            </span>
          </div>
        </div>
        
        <div className="p-4 flex flex-col gap-2 bg-white">
          <div className="flex items-center justify-between gap-2 overflow-hidden">
            {formattedDate && (
              <span className="text-[11px] font-mono flex-shrink-0 text-[#607D94]">
                {formattedDate}
              </span>
            )}
          </div>
          <h3 className="text-base font-bold transition-colors mt-0.5 line-clamp-1 text-[#102B3F] group-hover:text-[#3BBBE2]">
            {title}
          </h3>
          {description && (
            <p className="text-xs line-clamp-2 font-normal leading-relaxed text-[#607D94]">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Lightbox Modal with Full Photo Slider */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#102B3F]/90 backdrop-blur-xl p-3 md:p-8 animate-fadeIn">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 md:top-6 md:right-6 p-3 rounded-full bg-white/10 text-white hover:bg-[#3BBBE2] transition-colors z-50 cursor-pointer shadow-lg"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="max-w-5xl w-full max-h-[90vh] flex flex-col md:flex-row bg-[#102B3F] border border-[#3BBBE2]/30 rounded-3xl overflow-hidden shadow-2xl relative">
            {/* Image section with full slider */}
            <div className="md:w-3/5 bg-[#091B28] flex flex-col items-center justify-between p-4 md:p-6 relative min-h-[350px] md:min-h-[550px] max-h-[60vh] md:max-h-[85vh] select-none">
              {/* Slide Counter Badge */}
              {allImages.length > 1 && (
                <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-black/60 text-white text-xs font-mono font-semibold backdrop-blur-md border border-white/20">
                  {activeIdx + 1} / {allImages.length} {photoUnit}
                </div>
              )}

              {/* Main Image Display */}
              <div className="w-full h-full flex-1 flex items-center justify-center relative overflow-hidden py-2">
                <img
                  src={allImages[activeIdx]}
                  alt={`${title} photo ${activeIdx + 1}`}
                  className="max-h-full max-w-full object-contain rounded-lg shadow-2xl transition-all duration-300"
                />
              </div>

              {/* Slider Navigation Arrows */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-[#3BBBE2] hover:scale-110 transition-all z-20 cursor-pointer backdrop-blur-md border border-white/20"
                    aria-label="Previous Photo"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-[#3BBBE2] hover:scale-110 transition-all z-20 cursor-pointer backdrop-blur-md border border-white/20"
                    aria-label="Next Photo"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>

                  {/* Thumbnail Row Selector */}
                  <div className="flex items-center gap-2 mt-2 pt-2 overflow-x-auto max-w-full px-2 z-20">
                    {allImages.map((imgUrl, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveIdx(idx)}
                        className={`relative w-12 h-12 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer ${
                          activeIdx === idx ? 'border-[#3BBBE2] scale-105 shadow-md' : 'border-white/20 opacity-50 hover:opacity-100'
                        }`}
                      >
                        <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Details section */}
            <div className="md:w-2/5 p-6 md:p-8 flex flex-col justify-between overflow-y-auto bg-[#0D2333] border-t md:border-t-0 md:border-l border-[#3BBBE2]/20 text-white">
              <div>

                <h2 className="text-xl md:text-2xl font-bold text-white mb-3 leading-tight">
                  {title}
                </h2>

                {formattedDate && (
                  <div className="flex items-center gap-2 text-xs text-[#3BBBE2]/80 mb-5 font-mono">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{formattedDate}</span>
                  </div>
                )}

                {description && (
                  <div className="space-y-2">
                    <h4 className="text-xs uppercase font-semibold text-white/50 tracking-wider">Detail Project</h4>
                    <p className="text-white/80 text-xs md:text-sm leading-relaxed font-normal whitespace-pre-line">
                      {description}
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-4 mt-6 border-t border-white/10 flex justify-between items-center text-xs text-white/50 font-mono">
                <span>PGP INT PACIFIC</span>
                <span>Exhibition & Event</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
