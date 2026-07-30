'use client';

import { useState } from 'react';
import ProjectCard from '@/components/ProjectCard';
import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/lib/translations';
import { ChevronDown, ChevronUp } from 'lucide-react';

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  eventDate: string | Date;
  description: string | null;
}

export default function PortfolioSection({
  projects,
  dbError,
}: {
  projects: ProjectItem[];
  dbError: boolean;
}) {
  const [showAll, setShowAll] = useState(false);
  const { lang } = useLanguage();
  const text = t[lang].portfolio;

  // Max 3 rows limit (4 items per row on desktop = 12 items)
  const INITIAL_LIMIT = 12;
  const visibleProjects = showAll ? projects : projects.slice(0, INITIAL_LIMIT);
  const hasMore = projects.length > INITIAL_LIMIT;

  const showMoreLabel =
    lang === 'ko'
      ? `프로젝트 더보기 (${projects.length - INITIAL_LIMIT}개 더보기)`
      : lang === 'en'
      ? `Show More Projects (${projects.length - INITIAL_LIMIT} more)`
      : `Lihat Lebih Banyak Project (${projects.length - INITIAL_LIMIT} lagi)`;

  const showLessLabel =
    lang === 'ko'
      ? '접기'
      : lang === 'en'
      ? 'Show Less'
      : 'Tampilkan Lebih Sedikit';

  return (
    <section id="portfolio" className="py-24 md:py-32 border-t border-[#607D94]/15 bg-[#F4F9FC] text-[#102B3F] transition-colors duration-300">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-[#102B3F] mb-4">{text.title}</h2>
          <p className="max-w-4xl text-base md:text-lg font-normal leading-relaxed text-[#607D94]">
            {text.desc}
          </p>
        </div>

        {/* Poster Grid */}
        {projects.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-start">
              {visibleProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  id={project.id}
                  title={project.title}
                  category={project.category}
                  imageUrl={project.imageUrl}
                  eventDate={project.eventDate}
                  description={project.description}
                />
              ))}
            </div>

            {/* Show More / Show Less Button */}
            {hasMore && (
              <div className="mt-12 flex justify-center">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm bg-white border border-[#607D94]/20 text-[#102B3F] hover:bg-[#3BBBE2] hover:text-white hover:border-[#3BBBE2] transition-all shadow-md cursor-pointer group"
                >
                  <span>{showAll ? showLessLabel : showMoreLabel}</span>
                  {showAll ? (
                    <ChevronUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
                  ) : (
                    <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                  )}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="py-24 text-center border border-[#607D94]/20 bg-white rounded-2xl">
            <p className="text-lg text-[#607D94]">
              {dbError ? text.dbError : text.empty}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
