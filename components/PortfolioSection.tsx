'use client';

import { useState, useMemo } from 'react';
import ProjectCard from '@/components/ProjectCard';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
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
  const { theme } = useTheme();
  const text = t[lang].portfolio;
  const isLight = theme === 'light';

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
    <section id="portfolio" className={`py-24 md:py-32 border-t transition-colors duration-300 ${
      isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-black border-white/10 text-white'
    }`}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <p className={`text-xs font-semibold tracking-widest uppercase mb-4 ${isLight ? 'text-slate-500' : 'text-white/50'}`}>{text.badge}</p>
            <h2 className="text-4xl md:text-6xl font-medium tracking-tight">{text.title}</h2>
          </div>
          <p className={`max-w-md text-base font-light ${isLight ? 'text-slate-600' : 'text-white/60'}`}>
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
                    ? isLight 
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md' 
                      : 'bg-white text-black border-white shadow-lg shadow-white/10'
                    : isLight 
                      ? 'bg-slate-100 text-slate-700 border-slate-200 hover:border-slate-300' 
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
                <div className={`flex items-center gap-4 pb-2 border-b ${isLight ? 'border-slate-200' : 'border-white/10'}`}>
                  <div className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                  <h3 className="text-xl md:text-2xl font-semibold tracking-tight uppercase">
                    {categoryName}
                  </h3>
                  <span className={`text-xs font-mono ${isLight ? 'text-slate-400' : 'text-white/40'}`}>({items.length} Event)</span>
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
          <div className={`py-24 text-center border rounded-2xl ${
            isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/[0.02] border-white/10'
          }`}>
            <p className={`text-lg ${isLight ? 'text-slate-400' : 'text-white/40'}`}>
              {dbError ? text.dbError : text.empty}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
