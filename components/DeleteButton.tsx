'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';

interface DeleteButtonProps {
  endpoint: string; // e.g. '/api/projects/123' or '/api/services/123'
  itemTitle: string;
  onDeleted?: () => void;
}

export default function DeleteButton({ endpoint, itemTitle, onDeleted }: DeleteButtonProps) {
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
      if (onDeleted) {
        onDeleted();
      }
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
        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 border border-red-200/80 rounded-lg transition-all shadow-xs cursor-pointer"
        title="Hapus"
      >
        <Trash2 className="w-4 h-4" />
      </button>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#102B3F]/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white border border-[#607D94]/20 rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-2xl text-[#102B3F]">
            <h3 className="text-lg font-bold text-[#102B3F]">Hapus Item Ini?</h3>
            <p className="text-xs text-[#607D94] leading-relaxed">
              Apakah Anda yakin ingin menghapus <strong className="text-[#102B3F] font-bold">"{itemTitle}"</strong>? Tindakan ini tidak dapat dibatalkan.
            </p>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                disabled={loading}
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 text-xs font-semibold text-[#607D94] hover:text-[#102B3F] hover:bg-[#F4F9FC] border border-[#607D94]/20 rounded-lg transition-all cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={loading}
                onClick={handleDelete}
                className="px-4 py-2 text-xs font-semibold bg-red-600 text-white hover:bg-red-700 rounded-lg transition-all shadow-md shadow-red-600/20 disabled:opacity-50 cursor-pointer"
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
