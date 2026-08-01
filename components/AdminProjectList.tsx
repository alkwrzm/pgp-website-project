'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Pencil, GripVertical, Check, Loader2 } from 'lucide-react';
import DeleteButton from '@/components/DeleteButton';

interface Project {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  eventDate: string | Date;
  description: string | null;
  order: number;
  isActive?: boolean;
}

export default function AdminProjectList({ initialProjects }: { initialProjects: Project[] }) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleToggleActive = async (id: string, currentActive: boolean) => {
    const nextActive = !currentActive;
    // Optimistic UI update
    setProjects(projects.map((p) => (p.id === id ? { ...p, isActive: nextActive } : p)));

    try {
      await fetch(`/api/projects/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: nextActive }),
      });
    } catch (e) {
      console.error('Failed to update status', e);
      // Revert if error
      setProjects(projects.map((p) => (p.id === id ? { ...p, isActive: currentActive } : p)));
    }
  };

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

    const updated = [...projects];
    const [draggedItem] = updated.splice(draggedIdx, 1);
    updated.splice(idx, 0, draggedItem);

    // Assign new sequential order index
    const reordered = updated.map((item, index) => ({
      ...item,
      order: index,
    }));

    setProjects(reordered);
    setDraggedIdx(null);
    setDragOverIdx(null);

    // Save to server API
    setSaving(true);
    setSaveSuccess(false);

    try {
      await fetch('/api/projects/reorder', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: reordered.map((item) => ({ id: item.id, order: item.order })),
        }),
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to save reorder', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDragEnd = () => {
    setDraggedIdx(null);
    setDragOverIdx(null);
  };

  if (projects.length === 0) {
    return (
      <div className="py-12 text-center text-white/40">
        Belum ada project yang diupload. Buat project pertama Anda.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Saving status indicator */}
      <div className="flex items-center justify-between px-2 text-xs font-mono text-[#607D94]">
        <span className="flex items-center gap-1.5 text-[#1A7B9B] font-medium">
          <GripVertical className="w-4 h-4 text-[#3BBBE2]" />
          <span>Geser / Drag baris untuk mengubah urutan poster di website utama</span>
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
              <th className="px-4 py-4 font-semibold">Project</th>
              <th className="px-6 py-4 font-semibold">Category</th>
              <th className="px-6 py-4 font-semibold">Date</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#607D94]/15 bg-white">
            {projects.map((project, idx) => {
              const isDragging = draggedIdx === idx;
              const isDragOver = dragOverIdx === idx;
              const active = project.isActive !== false;

              return (
                <tr
                  key={project.id}
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
                      <div className="relative w-14 h-11 rounded-lg overflow-hidden bg-[#F4F9FC] flex-shrink-0 border border-[#607D94]/20 shadow-xs">
                        <Image src={project.imageUrl} alt={project.title} fill sizes="56px" className="object-cover" />
                      </div>
                      <div>
                        <span className="font-bold text-[#102B3F] block">{project.title}</span>
                        <span className="text-[11px] font-mono text-[#1A7B9B] font-semibold">Posisi ke-{idx + 1}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase bg-[#3BBBE2]/10 text-[#1A7B9B] border border-[#3BBBE2]/20">
                      {project.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-[#607D94]">
                    {new Date(project.eventDate).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleActive(project.id, active);
                      }}
                      className="flex items-center gap-2.5 group cursor-pointer select-none"
                      title={active ? 'Klik untuk menyembunyikan dari website utama' : 'Klik untuk menampilkan di website utama'}
                    >
                      <div className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-300 shadow-inner ${active ? 'bg-[#3BBBE2]' : 'bg-slate-300'}`}>
                        <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${active ? 'translate-x-5' : 'translate-x-0'}`} />
                      </div>
                      <span className={`text-xs font-bold transition-colors ${active ? 'text-[#102B3F]' : 'text-slate-400'}`}>
                        {active ? 'Aktif' : 'Nonaktif'}
                      </span>
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                      <Link 
                        href={`/admin/projects/${project.id}/edit`}
                        className="p-2 text-[#607D94] hover:text-[#102B3F] hover:bg-[#F4F9FC] rounded-lg transition-colors border border-transparent hover:border-[#607D94]/20"
                        title="Edit Project"
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <DeleteButton
                        endpoint={`/api/projects/${project.id}`}
                        itemTitle={project.title}
                        onDeleted={() => setProjects(projects.filter((p) => p.id !== project.id))}
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
