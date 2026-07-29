'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Tag } from 'lucide-react';

type Project = {
  id?: string;
  title: string;
  category: string;
  imageUrl: string;
  eventDate: string;
  description: string | null;
};

const CATEGORY_SUGGESTIONS = [
  'PARTNER WITH STARVERSE LAB',
  'PAST EVENT LIVECONNECT',
  'K-POP EXHIBITION',
  'BRAND ACTIVATION',
  'CONCERT & FANMEETING',
];

export default function ProjectForm({ initialData }: { initialData?: Project }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    category: initialData?.category || '',
    imageUrl: initialData?.imageUrl || '',
    eventDate: initialData?.eventDate ? new Date(initialData.eventDate).toISOString().split('T')[0] : '',
    description: initialData?.description || '',
  });

  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async (file: File) => {
    const uploadData = new FormData();
    uploadData.append('file', file);
    
    const adminPassword = typeof window !== 'undefined' ? localStorage.getItem('admin_pwd') || '' : '';
    
    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: {
        ...(adminPassword && { 'Authorization': `Bearer ${adminPassword}` }),
      },
      body: uploadData,
    });
    
    if (!res.ok) throw new Error('Upload failed');
    const { url } = await res.json();
    return url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let finalImageUrl = formData.imageUrl;
      if (file) {
        finalImageUrl = await handleUpload(file);
      }

      if (!finalImageUrl) {
        throw new Error('Poster image is required');
      }

      const url = initialData?.id ? `/api/projects/${initialData.id}` : '/api/projects';
      const method = initialData?.id ? 'PUT' : 'POST';
      
      const adminPassword = typeof window !== 'undefined' ? localStorage.getItem('admin_pwd') || '' : '';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(adminPassword && { 'Authorization': `Bearer ${adminPassword}` }),
        },
        body: JSON.stringify({ ...formData, imageUrl: finalImageUrl }),
      });

      if (!res.ok) throw new Error('Failed to save project');
      
      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl bg-black p-8 rounded-2xl border border-white/10">
      {error && <div className="p-4 bg-red-950 text-red-400 rounded-lg text-sm">{error}</div>}
      
      <div>
        <label className="block text-xs uppercase font-semibold tracking-wider text-white/60 mb-2">
          Project Title *
        </label>
        <input 
          required
          type="text" 
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="contoh: 2025 Together for the Environment Concert"
          className="w-full bg-zinc-950 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs uppercase font-semibold tracking-wider text-white/60">
              Sub-Section / Tagging Master *
            </label>
          </div>

          <input 
            required
            type="text" 
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            placeholder="Pilih chip atau ketik tag baru..."
            className="w-full bg-zinc-950 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white transition-colors mb-3"
          />

          {/* Quick Suggestion Chips */}
          <div className="flex flex-wrap gap-1.5">
            {CATEGORY_SUGGESTIONS.map((sug) => (
              <button
                type="button"
                key={sug}
                onClick={() => setFormData({ ...formData, category: sug })}
                className={`text-[10px] px-2.5 py-1 rounded-full border transition-all ${
                  formData.category === sug
                    ? 'bg-white text-black font-semibold border-white'
                    : 'bg-white/5 text-white/60 border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                + {sug}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase font-semibold tracking-wider text-white/60 mb-2">
            Event Date *
          </label>
          <input 
            required
            type="date" 
            value={formData.eventDate}
            onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
            className="w-full bg-zinc-950 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs uppercase font-semibold tracking-wider text-white/60 mb-2">
          Poster Image *
        </label>
        {formData.imageUrl && !file && (
          <div className="mb-4 relative h-40 w-32 rounded-lg overflow-hidden border border-white/10 bg-zinc-950 p-1">
            <Image src={formData.imageUrl} alt="Preview" fill sizes="256px" className="object-contain" />
          </div>
        )}
        <input 
          type="file" 
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full text-white/70 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white file:text-black hover:file:bg-white/90"
        />
      </div>

      <div>
        <label className="block text-xs uppercase font-semibold tracking-wider text-white/60 mb-2">
          Description (Optional)
        </label>
        <textarea 
          rows={4}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Detail acara, lineup artis, venue..."
          className="w-full bg-zinc-950 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white transition-colors resize-none"
        />
      </div>

      <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
        <button 
          type="submit" 
          disabled={loading}
          className="bg-white text-black px-8 py-3 rounded-xl font-medium hover:bg-white/90 transition-colors disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Project'}
        </button>
      </div>
    </form>
  );
}
