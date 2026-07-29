'use client';

import Image from 'next/image';
import { useState } from 'react';
import { X, Calendar, Tag, Maximize2 } from 'lucide-react';

interface ProjectCardProps {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  eventDate?: string | Date;
  description?: string | null;
}

export default function ProjectCard({ title, category, imageUrl, eventDate, description }: ProjectCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const formattedDate = eventDate
    ? new Date(eventDate).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })
    : null;

  return (
    <>
      {/* Project Poster Card - Compact True Ratio Display */}
      <div 
        onClick={() => setIsOpen(true)}
        className="group cursor-pointer flex flex-col bg-zinc-950/80 border border-white/10 rounded-2xl overflow-hidden hover-lift transition-all duration-300 hover:border-white/30"
      >
        <div className="relative w-full h-[360px] md:h-[390px] bg-black/60 overflow-hidden flex items-center justify-center p-3">
          {/* Using object-contain with fixed card container height to keep true ratio without overflowing vertical screen */}
          <img
            src={imageUrl}
            alt={title}
            className="max-h-full max-w-full object-contain rounded-lg transition-transform duration-500 group-hover:scale-[1.03] shadow-lg"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-medium flex items-center gap-1.5 border border-white/20">
              <Maximize2 className="w-3.5 h-3.5" />
              Perbesar Poster
            </span>
          </div>
        </div>
        
        <div className="p-4 flex flex-col gap-2 bg-gradient-to-b from-transparent to-black/80">
          <div className="flex items-center justify-between gap-2 overflow-hidden">
            <span className="text-[10px] font-semibold tracking-wider text-white/70 uppercase px-2.5 py-0.5 bg-white/10 rounded-full border border-white/10 truncate max-w-[60%]" title={category}>
              {category}
            </span>
            {formattedDate && (
              <span className="text-[11px] text-white/40 font-mono flex-shrink-0">
                {formattedDate}
              </span>
            )}
          </div>
          <h3 className="text-base font-medium text-white group-hover:text-white/90 transition-colors mt-0.5 line-clamp-1">
            {title}
          </h3>
          {description && (
            <p className="text-xs text-white/50 line-clamp-2 font-light leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Lightbox Modal for Full True-Ratio Poster View */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 md:p-8 animate-fadeIn">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-50"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="max-w-4xl w-full max-h-[88vh] flex flex-col md:flex-row bg-zinc-950 border border-white/15 rounded-3xl overflow-hidden shadow-2xl">
            {/* Image section with true aspect ratio display */}
            <div className="md:w-3/5 bg-black flex items-center justify-center p-4 md:p-6 overflow-auto max-h-[55vh] md:max-h-[85vh]">
              <img
                src={imageUrl}
                alt={title}
                className="max-h-full max-w-full object-contain rounded-lg shadow-lg"
              />
            </div>

            {/* Details section */}
            <div className="md:w-2/5 p-6 flex flex-col justify-between overflow-y-auto bg-zinc-900/50 border-t md:border-t-0 md:border-l border-white/10">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-white/10 text-white/80 rounded-full text-xs uppercase font-medium tracking-wide flex items-center gap-1.5">
                    <Tag className="w-3 h-3" />
                    {category}
                  </span>
                </div>

                <h2 className="text-xl md:text-2xl font-bold text-white mb-3 leading-tight">
                  {title}
                </h2>

                {formattedDate && (
                  <div className="flex items-center gap-2 text-xs text-white/50 mb-5 font-mono">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{formattedDate}</span>
                  </div>
                )}

                {description && (
                  <div className="space-y-2">
                    <h4 className="text-xs uppercase font-semibold text-white/40 tracking-wider">Detail Project</h4>
                    <p className="text-white/70 text-xs md:text-sm leading-relaxed font-light whitespace-pre-line">
                      {description}
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-4 mt-6 border-t border-white/10 flex justify-between items-center text-xs text-white/40">
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
