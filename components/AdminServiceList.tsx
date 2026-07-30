'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Pencil, GripVertical, Check, Loader2, Images } from 'lucide-react';
import DeleteButton from '@/components/DeleteButton';

interface Service {
  id: string;
  title: string;
  subtitle?: string | null;
  category: string;
  description?: string | null;
  images: string[];
  order: number;
}

export default function AdminServiceList({ initialServices }: { initialServices: Service[] }) {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleDragStart = (idx: number) => {
    setDraggedIdx(idx);
  };

  const handleDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === idx) return;
    setDragOverIdx(idx);
  };

  const handleDrop = async (idx: number) => {
    if (draggedIdx === null || draggedIdx === idx) return;

    const updated = [...services];
    const [draggedItem] = updated.splice(draggedIdx, 1);
    updated.splice(idx, 0, draggedItem);

    // Assign new sequential order index
    const reordered = updated.map((item, index) => ({
      ...item,
      order: index,
    }));

    setServices(reordered);
    setDraggedIdx(null);
    setDragOverIdx(null);

    // Save to server API
    setSaving(true);
    try {
      const res = await fetch('/api/services/reorder', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: reordered.map((item, index) => ({ id: item.id, order: index })),
        }),
      });

      if (res.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 2000);
      }
    } catch (err) {
      console.error('Failed to save service order:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDragEnd = () => {
    setDraggedIdx(null);
    setDragOverIdx(null);
  };

  if (services.length === 0) {
    return (
      <div className="py-12 text-center text-white/40">
        Belum ada service yang dibuat.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Saving status indicator */}
      <div className="flex items-center justify-between px-2 text-xs font-mono text-[#607D94]">
        <span className="flex items-center gap-1.5 text-[#1A7B9B] font-medium">
          <GripVertical className="w-4 h-4 text-[#3BBBE2]" />
          <span>Geser / Drag baris untuk mengubah urutan layanan di website utama</span>
        </span>
        {saving && (
          <span className="flex items-center gap-1 text-amber-600 animate-pulse font-semibold">
            <Loader2 className="w-3.5 h-3.5 animate-spin" /> Menyimpan urutan...
          </span>
        )}
        {saveSuccess && (
          <span className="flex items-center gap-1 text-emerald-600 font-semibold">
            <Check className="w-3.5 h-3.5" /> Urutan berhasil disimpan!
          </span>
        )}
      </div>

      <div className="bg-white border border-[#607D94]/20 rounded-2xl overflow-hidden shadow-xl shadow-[#1A7B9B]/5">
        <table className="w-full text-left text-sm text-[#102B3F] border-collapse">
          <thead className="bg-[#F4F9FC] text-[#607D94] text-xs font-mono uppercase border-b border-[#607D94]/15 select-none">
            <tr>
              <th className="w-10 px-3 py-4 text-center">#</th>
              <th className="px-4 py-4 font-semibold">Service / Product</th>
              <th className="px-6 py-4 font-semibold">Kategori</th>
              <th className="px-6 py-4 font-semibold">Jumlah Foto</th>
              <th className="px-6 py-4 font-semibold text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#607D94]/15 bg-white">
            {services.map((service, idx) => {
              const isDragging = draggedIdx === idx;
              const isDragOver = dragOverIdx === idx;

              return (
                <tr
                  key={service.id}
                  draggable
                  onDragStart={() => handleDragStart(idx)}
                  onDragOver={(e) => handleDragOver(e, idx)}
                  onDrop={() => handleDrop(idx)}
                  onDragEnd={handleDragEnd}
                  className={`transition-all duration-150 cursor-grab active:cursor-grabbing ${
                    isDragging
                      ? 'opacity-40 bg-[#F4F9FC]'
                      : isDragOver
                      ? 'bg-[#3BBBE2]/10 border-y-2 border-[#3BBBE2]'
                      : 'hover:bg-[#F4F9FC]/60'
                  }`}
                >
                  <td className="w-10 px-3 py-4 text-center text-[#607D94]">
                    <GripVertical className="w-4 h-4 mx-auto text-[#607D94]/40 hover:text-[#102B3F] transition-colors" />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-[#F4F9FC] flex items-center justify-center flex-shrink-0 border border-[#607D94]/20 shadow-xs">
                        {service.images && service.images.length > 0 ? (
                          <Image src={service.images[0]} alt={service.title} fill sizes="48px" className="object-cover" />
                        ) : (
                          <Images className="w-5 h-5 text-[#607D94]" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-[#102B3F]">{service.title}</h4>
                        {service.subtitle && (
                          <p className="text-xs text-[#607D94] font-normal truncate max-w-xs">{service.subtitle}</p>
                        )}
                        <span className="text-[11px] font-mono text-[#1A7B9B] font-semibold">Posisi ke-{idx + 1}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-[#3BBBE2]/10 rounded-full text-xs text-[#1A7B9B] border border-[#3BBBE2]/20 font-semibold uppercase">
                      {service.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-[#607D94]">
                    {service.images?.length || 0} Foto/UI
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                      <Link 
                        href={`/admin/services/${service.id}/edit`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F4F9FC] text-[#102B3F] hover:bg-[#3BBBE2] hover:text-white rounded-lg border border-[#607D94]/20 transition-all text-xs font-semibold shadow-xs"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                        Edit / Foto
                      </Link>
                      <DeleteButton
                        endpoint={`/api/services/${service.id}`}
                        itemTitle={service.title}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
