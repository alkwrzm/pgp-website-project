'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Upload, X, Plus, Trash2 } from 'lucide-react';

type ServiceData = {
  id?: string;
  title: string;
  subtitle?: string | null;
  category: string;
  description?: string | null;
  images: string[];
  order?: number;
};

export default function ServiceForm({ initialData }: { initialData?: ServiceData }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    subtitle: initialData?.subtitle || '',
    category: initialData?.category || 'Photocard & Merchandise',
    description: initialData?.description || '',
    images: initialData?.images || [],
    order: initialData?.order ?? 0,
    isActive: (initialData as any)?.isActive !== undefined ? (initialData as any).isActive : true,
  });

  // Handle uploading multiple image files to Supabase via /api/upload
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

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: uploadData,
        });

        if (!res.ok) throw new Error(`Upload error on ${file.name}`);
        const data = await res.json();
        if (data.url) uploadedUrls.push(data.url);
      }

      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls],
      }));
    } catch (err: any) {
      setError(err.message || 'Upload gagal');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== indexToRemove),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const url = initialData?.id ? `/api/services/${initialData.id}` : '/api/services';
      const method = initialData?.id ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Gagal menyimpan service');
      }

      router.push('/admin/services');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl bg-white p-8 rounded-3xl border border-[#607D94]/20 shadow-xl shadow-[#1A7B9B]/5 text-[#102B3F]">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-sm">
          {error}
        </div>
      )}

      <div>
        <label className="block text-xs uppercase font-semibold tracking-wider text-[#102B3F] mb-2">
          Nama Service / Produk *
        </label>
        <input
          required
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="contoh: PocketDrop (Aplikasi/Online)"
          className="w-full bg-[#F4F9FC] border border-[#607D94]/25 rounded-xl px-4 py-3 text-[#102B3F] placeholder-[#607D94]/50 focus:outline-none focus:border-[#3BBBE2] focus:ring-1 focus:ring-[#3BBBE2] transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs uppercase font-semibold tracking-wider text-[#102B3F] mb-2">
            Subtitle / Tagline Singkat
          </label>
          <input
            type="text"
            value={formData.subtitle}
            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            placeholder="contoh: Aplikasi koleksi photocard digital & reward"
            className="w-full bg-[#F4F9FC] border border-[#607D94]/25 rounded-xl px-4 py-3 text-[#102B3F] placeholder-[#607D94]/50 focus:outline-none focus:border-[#3BBBE2] focus:ring-1 focus:ring-[#3BBBE2] transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs uppercase font-semibold tracking-wider text-[#102B3F] mb-2">
            Kategori Service *
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full bg-[#F4F9FC] border border-[#607D94]/25 rounded-xl px-4 py-3 text-[#102B3F] focus:outline-none focus:border-[#3BBBE2] focus:ring-1 focus:ring-[#3BBBE2] transition-colors"
          >
            <option value="Photocard & Merchandise">Photocard & Merchandise</option>
            <option value="Konser & Fanmeeting">Konser & Fanmeeting K-Pop</option>
            <option value="Agensi Iklan & Model">Agensi Iklan & Model</option>
            <option value="Agensi Penghubung Perusahaan">Agensi Penghubung Perusahaan</option>
            <option value="Kerjasama Influencer">Kerjasama Influencer</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs uppercase font-semibold tracking-wider text-[#102B3F] mb-2">
          Deskripsi Lengkap
        </label>
        <textarea
          rows={4}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Jelaskan detail fitur aplikasi, spesifikasi kiosk, atau alur kerjasama..."
          className="w-full bg-[#F4F9FC] border border-[#607D94]/25 rounded-xl px-4 py-3 text-[#102B3F] placeholder-[#607D94]/50 focus:outline-none focus:border-[#3BBBE2] focus:ring-1 focus:ring-[#3BBBE2] transition-colors resize-none"
        />
      </div>

      {/* Multi-Image Gallery Upload */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-xs uppercase font-semibold tracking-wider text-[#102B3F]">
            Galeri foto / Screenshot App UI ({formData.images.length} foto)
          </label>
          {uploading && <span className="text-xs text-amber-600 font-mono font-semibold">Mengunggah gambar...</span>}
        </div>

        {/* Existing Images Grid */}
        {formData.images.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
            {formData.images.map((imgUrl, idx) => (
              <div key={idx} className="relative aspect-[9/16] bg-[#F4F9FC] rounded-2xl overflow-hidden border border-[#607D94]/20 group shadow-xs">
                <Image src={imgUrl} alt={`Gallery ${idx + 1}`} fill sizes="200px" className="object-contain p-1" />
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
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
          <span className="text-sm font-semibold text-[#102B3F]">Upload Foto / Screenshot (Bisa Banyak Sekaligus)</span>
          <span className="text-xs text-[#607D94] mt-1">Format PNG, JPG, WEBP</span>
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
        <label className="flex items-center gap-3 p-4 rounded-xl border border-[#607D94]/20 bg-[#F4F9FC] cursor-pointer hover:border-[#3BBBE2] transition-all">
          <input
            type="checkbox"
            checked={formData.isActive}
            onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
            className="w-5 h-5 accent-[#3BBBE2] rounded cursor-pointer"
          />
          <div>
            <span className="text-sm font-bold text-[#102B3F] block">Tampilkan di Website Utama (Status Aktif)</span>
            <span className="text-xs text-[#607D94]">Jika dicentang, service/produk ini akan terlihat oleh pengunjung publik.</span>
          </div>
        </label>
      </div>

      <div className="pt-4 flex justify-end gap-4 border-t border-[#607D94]/15">
        <button
          type="button"
          onClick={() => router.push('/admin/services')}
          className="px-6 py-3 rounded-xl border border-[#607D94]/25 text-[#607D94] hover:text-[#102B3F] hover:bg-[#F4F9FC] transition-colors font-medium cursor-pointer"
        >
          Batal
        </button>
        <button
          type="submit"
          disabled={loading || uploading}
          className="bg-[#3BBBE2] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#1A7B9B] shadow-md shadow-[#3BBBE2]/20 transition-all disabled:opacity-50 cursor-pointer"
        >
          {loading ? 'Menyimpan...' : 'Simpan Service'}
        </button>
      </div>
    </form>
  );
}
