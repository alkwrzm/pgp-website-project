'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';

interface DeleteButtonProps {
  endpoint: string; // e.g. '/api/projects/123' or '/api/services/123'
  itemTitle: string;
}

export default function DeleteButton({ endpoint, itemTitle }: DeleteButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch(endpoint, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Gagal menghapus data');
      }

      setShowConfirm(false);
      router.refresh();
    } catch (err: any) {
      alert(err.message || 'Terjadi kesalahan saat menghapus');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setShowConfirm(true)}
        className="p-2 text-white/50 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
        title="Hapus"
      >
        <Trash2 className="w-4 h-4" />
      </button>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-zinc-950 border border-white/15 rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-2xl">
            <h3 className="text-lg font-semibold text-white">Hapus Data?</h3>
            <p className="text-xs text-white/60 leading-relaxed">
              Apakah Anda yakin ingin menghapus <strong className="text-white font-medium">"{itemTitle}"</strong>? Tindakan ini tidak dapat dibatalkan.
            </p>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                disabled={loading}
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 text-xs font-medium text-white/70 hover:text-white border border-white/10 rounded-lg transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={loading}
                onClick={handleDelete}
                className="px-4 py-2 text-xs font-medium bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50"
              >
                {loading ? 'Menghapus...' : 'Ya, Hapus'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
