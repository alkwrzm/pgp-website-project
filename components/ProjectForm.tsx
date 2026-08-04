'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Tag, Upload, X, Images } from 'lucide-react';

type Project = {
  id?: string;
  title: string;
  category: string;
  imageUrl: string;
  images?: string[];
  eventDate: string;
  description: string | null;
  isActive?: boolean;
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
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  
  const initialImagesList = initialData?.images && initialData.images.length > 0 
    ? initialData.images 
    : (initialData?.imageUrl ? [initialData.imageUrl] : []);

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    category: initialData?.category || '',
    imageUrl: initialData?.imageUrl || '',
    images: initialImagesList,
    eventDate: initialData?.eventDate ? new Date(initialData.eventDate).toISOString().split('T')[0] : '',
    description: initialData?.description || '',
    isActive: initialData?.isActive !== undefined ? initialData.isActive : true,
  });

  const handleMultipleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setError('');

    try {
      const uploadedUrls: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
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

        if (!res.ok) throw new Error('Upload gagal');
        const { url } = await res.json();
        uploadedUrls.push(url);
      }

      setFormData((prev) => {
        const newImages = [...prev.images, ...uploadedUrls];
        return {
          ...prev,
          images: newImages,
          imageUrl: prev.imageUrl || newImages[0] || '',
        };
      });
    } catch (err: any) {
      setError(err.message || 'Gagal mengunggah foto');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (indexToRemove: number) => {
    setFormData((prev) => {
      const newImages = prev.images.filter((_, idx) => idx !== indexToRemove);
      return {
        ...prev,
        images: newImages,
        imageUrl: newImages[0] || '',
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const primaryImage = formData.imageUrl || (formData.images.length > 0 ? formData.images[0] : '');

      if (!primaryImage && formData.images.length === 0) {
        throw new Error('Minimal harus ada 1 poster/foto project yang di-upload');
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
        body: JSON.stringify({ 
          ...formData, 
          imageUrl: primaryImage,
          images: formData.images.length > 0 ? formData.images : [primaryImage] 
        }),
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
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl bg-white p-8 rounded-3xl border border-[#607D94]/20 shadow-xl shadow-[#1A7B9B]/5 text-[#102B3F]">
      {error && <div className="p-4 bg-red-50 text-red-600 border border-red-200 rounded-xl text-sm">{error}</div>}
      
      <div>
        <label className="block text-xs uppercase font-semibold tracking-wider text-[#102B3F] mb-2">
          Project Title *
        </label>
        <input 
          required
          type="text" 
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="contoh: [SUPER JUNIOR] SUPER RECORDS"
          className="w-full bg-[#F4F9FC] border border-[#607D94]/25 rounded-xl px-4 py-3 text-[#102B3F] placeholder-[#607D94]/50 focus:outline-none focus:border-[#3BBBE2] focus:ring-1 focus:ring-[#3BBBE2] transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs uppercase font-semibold tracking-wider text-[#102B3F]">
              Sub-Section / Tagging Master *
            </label>
          </div>

          <input 
            required
            type="text" 
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            placeholder="Pilih chip atau ketik tag baru..."
            className="w-full bg-[#F4F9FC] border border-[#607D94]/25 rounded-xl px-4 py-3 text-[#102B3F] placeholder-[#607D94]/50 focus:outline-none focus:border-[#3BBBE2] focus:ring-1 focus:ring-[#3BBBE2] transition-colors mb-3"
          />

          {/* Quick Suggestion Chips */}
          <div className="flex flex-wrap gap-1.5">
            {CATEGORY_SUGGESTIONS.map((sug) => (
              <button
                type="button"
                key={sug}
                onClick={() => setFormData({ ...formData, category: sug })}
                className={`text-[10px] px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                  formData.category === sug
                    ? 'bg-[#3BBBE2] text-white font-semibold border-[#3BBBE2]'
                    : 'bg-[#F4F9FC] text-[#607D94] border-[#607D94]/20 hover:border-[#3BBBE2] hover:text-[#102B3F]'
                }`}
              >
                + {sug}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase font-semibold tracking-wider text-[#102B3F] mb-2">
            Event Date <span className="text-[#607D94] font-normal lowercase">(opsional / kosongkan jika tidak ingin ditampilkan)</span>
          </label>
          <input 
            type="date" 
            value={formData.eventDate}
            onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
            className="w-full bg-[#F4F9FC] border border-[#607D94]/25 rounded-xl px-4 py-3 text-[#102B3F] focus:outline-none focus:border-[#3BBBE2] focus:ring-1 focus:ring-[#3BBBE2] transition-colors"
          />
        </div>
      </div>

      {/* Multi-Poster / Photo Gallery Upload */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-xs uppercase font-semibold tracking-wider text-[#102B3F]">
            Poster Utama & Galeri Foto Project ({formData.images.length} Foto/Poster) *
          </label>
          {uploading && <span className="text-xs text-amber-600 font-mono font-semibold">Mengunggah gambar...</span>}
        </div>

        {/* Existing Images Grid */}
        {formData.images.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
            {formData.images.map((imgUrl, idx) => (
              <div 
                key={idx} 
                onClick={() => setFormData({ ...formData, imageUrl: imgUrl })}
                className={`relative aspect-[3/4] bg-[#F4F9FC] rounded-2xl overflow-hidden border transition-all group shadow-xs cursor-pointer ${
                  formData.imageUrl === imgUrl ? 'border-[#3BBBE2] ring-2 ring-[#3BBBE2]' : 'border-[#607D94]/20 hover:border-[#3BBBE2]/60'
                }`}
              >
                <Image src={imgUrl} alt={`Poster ${idx + 1}`} fill sizes="200px" className="object-contain p-1" />
                {formData.imageUrl === imgUrl && (
                  <span className="absolute bottom-2 left-2 bg-[#3BBBE2] text-white text-[9px] font-bold uppercase px-2 py-0.5 rounded-full shadow-xs">
                    Poster Utama
                  </span>
                )}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(idx);
                  }}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-red-600/90 text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-md cursor-pointer"
                  title="Hapus foto"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Upload Box */}
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-[#607D94]/30 hover:border-[#3BBBE2] rounded-2xl p-8 cursor-pointer bg-[#F4F9FC] transition-colors">
          <Upload className="w-8 h-8 text-[#3BBBE2] mb-2" />
          <span className="text-sm font-semibold text-[#102B3F]">Upload Poster / Foto Project (Bisa Pilih Banyak)</span>
          <span className="text-xs text-[#607D94] mt-1">Foto pertama akan menjadi Poster Utama. Klik foto di atas untuk ubah poster utama.</span>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleMultipleUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>

      <div>
        <label className="block text-xs uppercase font-semibold tracking-wider text-[#102B3F] mb-2">
          Description (Optional)
        </label>
        <textarea 
          rows={4}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Detail acara, lineup artis, venue..."
          className="w-full bg-[#F4F9FC] border border-[#607D94]/25 rounded-xl px-4 py-3 text-[#102B3F] placeholder-[#607D94]/50 focus:outline-none focus:border-[#3BBBE2] focus:ring-1 focus:ring-[#3BBBE2] transition-colors resize-none"
        />
      </div>

      <div>
        <label className="flex items-center gap-3 p-4 rounded-xl border border-[#607D94]/20 bg-[#F4F9FC] cursor-pointer hover:border-[#3BBBE2] transition-all">
          <input
            type="checkbox"
            checked={formData.isActive}
            onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
            className="w-5 h-5 accent-[#3BBBE2] rounded cursor-pointer"
          />
          <div>
            <span className="text-sm font-bold text-[#102B3F] block">Tampilkan di Website Utama (Status Aktif)</span>
            <span className="text-xs text-[#607D94]">Jika dicentang, project ini akan terlihat oleh pengunjung publik.</span>
          </div>
        </label>
      </div>

      <div className="pt-4 flex justify-end gap-3 border-t border-[#607D94]/15">
        <button 
          type="submit" 
          disabled={loading || uploading}
          className="bg-[#3BBBE2] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#1A7B9B] shadow-md shadow-[#3BBBE2]/20 transition-all disabled:opacity-50 cursor-pointer"
        >
          {loading ? 'Saving...' : 'Save Project'}
        </button>
      </div>
    </form>
  );
}
