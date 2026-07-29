import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';
import { Pencil, AlertTriangle } from 'lucide-react';
import DeleteButton from '@/components/DeleteButton';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  let projects: any[] = [];
  let dbError = false;

  try {
    projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error('Database initialization/connection error:', error);
    dbError = true;
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-medium text-white mb-2">Projects</h1>
          <p className="text-white/60">Kelola portfolio exhibition & event agency.</p>
        </div>
        <Link 
          href="/admin/projects/new"
          className="bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-white/90 transition-colors text-sm"
        >
          Add New Project
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

      <div className="bg-black border border-white/10 rounded-xl overflow-hidden shadow-xl">
        <table className="w-full text-left text-sm text-white/70">
          <thead className="bg-white/[0.02] text-white/50 text-xs uppercase border-b border-white/10">
            <tr>
              <th className="px-6 py-4 font-medium">Project</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {projects.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-white/40">
                  {dbError ? 'Data tidak dapat dimuat karena database belum terhubung.' : 'Belum ada project yang diupload. Buat project pertama Anda.'}
                </td>
              </tr>
            ) : (
              projects.map((project) => (
                <tr key={project.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-12 rounded overflow-hidden bg-white/10">
                        <Image src={project.imageUrl} alt={project.title} fill sizes="64px" className="object-cover" />
                      </div>
                      <span className="font-medium text-white">{project.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{project.category}</td>
                  <td className="px-6 py-4">
                    {new Date(project.eventDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link 
                        href={`/admin/projects/${project.id}/edit`}
                        className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded transition-colors"
                        title="Edit Project"
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <DeleteButton
                        endpoint={`/api/projects/${project.id}`}
                        itemTitle={project.title}
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
