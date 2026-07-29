'use client';

import { useState, useMemo } from 'react';
import ProjectCard from '@/components/ProjectCard';
import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/lib/translations';

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
  const [activeTag, setActiveTag] = useState<string>('All');
  const { lang } = useLanguage();
  const text = t[lang].portfolio;

  // Dynamically extract all unique categories / sub-section tags
  const tags = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => {
      if (p.category) set.add(p.category.trim());
    });
    return ['All', ...Array.from(set)];
  }, [projects]);

  // Group projects by category/sub-section
  const groupedProjects = useMemo(() => {
    const filtered = activeTag === 'All'
      ? projects
      : projects.filter((p) => p.category?.trim().toLowerCase() === activeTag.trim().toLowerCase());

    const groups: { [key: string]: ProjectItem[] } = {};
    filtered.forEach((project) => {
      const cat = project.category?.trim() || 'General';
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(project);
    });

    return groups;
  }, [projects, activeTag]);

  return (
    <section id="portfolio" className="py-24 md:py-32 border-t border-white/10 bg-black">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <p className="text-xs font-semibold tracking-widest text-white/50 uppercase mb-4">{text.badge}</p>
            <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-white">{text.title}</h2>
          </div>
          <p className="text-white/60 max-w-md text-base font-light">
            {text.desc}
          </p>
        </div>

        {/* Dynamic Filter / Sub-section Tabs */}
        {tags.length > 2 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-5 py-2.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all whitespace-nowrap border ${
                  activeTag === tag
                    ? 'bg-white text-black border-white shadow-lg shadow-white/10'
                    : 'bg-white/5 text-white/70 border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {/* Grouped Sub-sections Display */}
        {Object.keys(groupedProjects).length > 0 ? (
          <div className="space-y-16">
            {Object.entries(groupedProjects).map(([categoryName, items]) => (
              <div key={categoryName} className="space-y-6">
                {/* Sub-section Header Badge */}
                <div className="flex items-center gap-4 pb-2 border-b border-white/10">
                  <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-white uppercase">
                    {categoryName}
                  </h3>
                  <span className="text-xs font-mono text-white/40">({items.length} Event)</span>
                </div>

                {/* Sub-section Poster Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-start">
                  {items.map((project) => (
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
              </div>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center border border-white/10 rounded-2xl bg-white/[0.02]">
            <p className="text-white/40 text-lg">
              {dbError ? text.dbError : text.empty}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
