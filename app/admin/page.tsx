import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';
import AdminProjectList from '@/components/AdminProjectList';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  let projects: any[] = [];
  let dbError = false;

  try {
    projects = await prisma.project.findMany({
      orderBy: [{ order: 'asc' }, { eventDate: 'desc' }],
    });
  } catch (error) {
    console.error('Database initialization/connection error:', error);
    dbError = true;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#102B3F] mb-2">Projects</h1>
          <p className="text-[#607D94]">Kelola & atur urutan tampilan poster portfolio (Drag & Drop).</p>
        </div>
        <Link 
          href="/admin/projects/new"
          className="bg-[#3BBBE2] text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-[#1A7B9B] shadow-md shadow-[#3BBBE2]/20 transition-all text-sm flex items-center gap-1.5"
        >
          <span>+ Add New Project</span>
        </Link>
      </div>

      {dbError && (
        <div className="mb-8 p-6 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-start gap-4 text-amber-200">
          <AlertTriangle className="w-6 h-6 flex-shrink-0 text-amber-400 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-400 text-base mb-1">Database Belum Terhubung (`DATABASE_URL`)</h3>
            <p className="text-sm text-amber-200/80 mb-3">
              Prisma belum terhubung ke database. Harap siapkan file <code className="bg-black/40 px-2 py-0.5 rounded text-amber-300">.env</code> dengan URL Supabase/Postgres Anda, lalu jalankan command:
            </p>
            <code className="block bg-black/60 p-3 rounded-lg text-xs font-mono text-white/90 select-all border border-amber-500/20">
              npx prisma db push
            </code>
          </div>
        </div>
      )}

      <AdminProjectList initialProjects={projects} />
    </div>
  );
}
