'use client';

import { useState, useEffect, useRef } from 'react';
import { Music, Smartphone, Printer, Sparkles, ChevronDown, Heart, Star, Flame } from 'lucide-react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

export default function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const heroRef = useRef<HTMLDivElement>(null);

  // Track mouse coordinates for subtle parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  // Click burst particle effect
  const handleHeroClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const colors = ['#3BBBE2', '#1A7B9B', '#42C8EC', '#102B3F'];
    const newParticles: Particle[] = Array.from({ length: 8 }).map((_, i) => ({
      id: Date.now() + i,
      x: clickX + (Math.random() - 0.5) * 40,
      y: clickY + (Math.random() - 0.5) * 40,
      size: Math.random() * 12 + 8,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    setParticles((prev) => [...prev.slice(-20), ...newParticles]);
  };

  // Clean up particles after animation
  useEffect(() => {
    if (particles.length === 0) return;
    const timer = setTimeout(() => {
      setParticles((prev) => prev.slice(8));
    }, 1000);
    return () => clearTimeout(timer);
  }, [particles]);

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onClick={handleHeroClick}
      className="relative min-h-[85vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#F4F9FC] text-[#102B3F] px-4 cursor-pointer select-none"
    >
      {/* Dynamic Cursor Light Spotlight */}
      <div
        className="absolute w-[500px] h-[500px] bg-[#3BBBE2]/15 rounded-full blur-3xl pointer-events-none transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${mousePos.x * 300}px, ${mousePos.y * 300}px)`,
        }}
      />

      {/* Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#1A7B9B]/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-[#3BBBE2]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Constraining Container for Badges so they don't spread infinitely on ultra-wides */}
      <div className="absolute inset-0 w-full max-w-[1400px] mx-auto pointer-events-none">
        {/* Floating Interactive Badge 1: Top-Left */}
      <div
        className="absolute top-[20vh] left-4 md:top-24 md:left-24 transition-transform duration-500 ease-out pointer-events-auto z-20 scale-75 md:scale-100 origin-top-left"
        style={{
          transform: `translate(${mousePos.x * -40}px, ${mousePos.y * -40}px) rotate(-3deg)`,
        }}
      >
        <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/80 backdrop-blur-md border border-[#607D94]/20 shadow-lg shadow-[#1A7B9B]/5 text-[#102B3F] hover:scale-110 hover:border-[#3BBBE2] hover:shadow-[#3BBBE2]/20 transition-all cursor-pointer group">
          <div className="w-8 h-8 rounded-xl bg-[#3BBBE2]/15 text-[#1A7B9B] flex items-center justify-center group-hover:bg-[#3BBBE2] group-hover:text-white transition-colors">
            <Music className="w-4 h-4" />
          </div>
          <div className="text-left">
            <span className="block text-xs font-bold leading-tight">K-Pop Concerts</span>
            <span className="block text-[10px] text-[#607D94] font-mono">& Fanmeeting</span>
          </div>
        </div>
      </div>

      {/* Floating Interactive Badge 2: Top-Right */}
      <div
        className="absolute top-[18vh] right-4 md:top-20 md:right-28 transition-transform duration-500 ease-out pointer-events-auto z-20 scale-75 md:scale-100 origin-top-right"
        style={{
          transform: `translate(${mousePos.x * 50}px, ${mousePos.y * 30}px) rotate(4deg)`,
        }}
      >
        <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/80 backdrop-blur-md border border-[#607D94]/20 shadow-lg shadow-[#1A7B9B]/5 text-[#102B3F] hover:scale-110 hover:border-[#3BBBE2] hover:shadow-[#3BBBE2]/20 transition-all cursor-pointer group">
          <div className="w-8 h-8 rounded-xl bg-[#3BBBE2]/15 text-[#1A7B9B] flex items-center justify-center group-hover:bg-[#3BBBE2] group-hover:text-white transition-colors">
            <Smartphone className="w-4 h-4" />
          </div>
          <div className="text-left">
            <span className="block text-xs font-bold leading-tight">PocketDrop</span>
            <span className="block text-[10px] text-[#607D94] font-mono">Photocard App</span>
          </div>
        </div>
      </div>

      {/* Floating Interactive Badge 3: Bottom-Left */}
      <div
        className="absolute bottom-60 left-6 md:bottom-28 md:left-32 transition-transform duration-500 ease-out pointer-events-auto z-20 scale-75 md:scale-100 origin-bottom-left"
        style={{
          transform: `translate(${mousePos.x * -35}px, ${mousePos.y * 45}px) rotate(2deg)`,
        }}
      >
        <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/80 backdrop-blur-md border border-[#607D94]/20 shadow-lg shadow-[#1A7B9B]/5 text-[#102B3F] hover:scale-110 hover:border-[#3BBBE2] hover:shadow-[#3BBBE2]/20 transition-all cursor-pointer group">
          <div className="w-8 h-8 rounded-xl bg-[#3BBBE2]/15 text-[#1A7B9B] flex items-center justify-center group-hover:bg-[#3BBBE2] group-hover:text-white transition-colors">
            <Printer className="w-4 h-4" />
          </div>
          <div className="text-left">
            <span className="block text-xs font-bold leading-tight">PIC2GO</span>
            <span className="block text-[10px] text-[#607D94] font-mono">Photo Kiosks</span>
          </div>
        </div>
      </div>

      {/* Floating Interactive Badge 4: Bottom-Right */}
      <div
        className="absolute bottom-64 right-6 md:bottom-32 md:right-36 transition-transform duration-500 ease-out pointer-events-auto z-20 scale-75 md:scale-100 origin-bottom-right"
        style={{
          transform: `translate(${mousePos.x * 40}px, ${mousePos.y * -35}px) rotate(-4deg)`,
        }}
      >
        <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/80 backdrop-blur-md border border-[#607D94]/20 shadow-lg shadow-[#1A7B9B]/5 text-[#102B3F] hover:scale-110 hover:border-[#3BBBE2] hover:shadow-[#3BBBE2]/20 transition-all cursor-pointer group">
          <div className="w-8 h-8 rounded-xl bg-[#3BBBE2]/15 text-[#1A7B9B] flex items-center justify-center group-hover:bg-[#3BBBE2] group-hover:text-white transition-colors">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="text-left">
            <span className="block text-xs font-bold leading-tight">Model & Influencer</span>
            <span className="block text-[10px] text-[#607D94] font-mono">Agency</span>
          </div>
        </div>
      </div>

      </div>

      {/* Main Big Center Title */}
      <div
        className="text-center relative z-10 max-w-6xl mx-auto transition-transform duration-300 ease-out pointer-events-auto -mt-16 md:mt-0"
        style={{
          transform: `translate(${mousePos.x * 15}px, ${mousePos.y * 15}px)`,
        }}
      >
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] font-black tracking-tighter leading-none text-[#102B3F] transition-transform duration-300 hover:scale-[1.02]">
          <span className="text-[#3BBBE2]">P</span>lay <span className="text-[#3BBBE2]">G</span>round{' '}
          <span className="text-[#3BBBE2]">P</span>layful
        </h1>
      </div>

      {/* Click Burst Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full pointer-events-none animate-ping"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
          }}
        />
      ))}

      {/* Interactive Bottom Scroll Prompt */}
      <a
        href="#about"
        onClick={(e) => e.stopPropagation()}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-[#607D94] hover:text-[#3BBBE2] transition-colors group z-20"
      >
        <span className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#1A7B9B]">
          Explore Playground
        </span>
        <div className="w-8 h-8 rounded-full border border-[#607D94]/20 bg-white/80 backdrop-blur-md flex items-center justify-center group-hover:border-[#3BBBE2] group-hover:bg-[#3BBBE2] group-hover:text-white transition-all animate-bounce">
          <ChevronDown className="w-4 h-4" />
        </div>
      </a>
    </section>
  );
}
