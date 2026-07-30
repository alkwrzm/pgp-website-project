import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { PlusSquare } from 'lucide-react';
import { ensureServicesSeeded } from '@/lib/seedServices';
import AdminServiceList from '@/components/AdminServiceList';

export const dynamic = 'force-dynamic';

export default async function AdminServicesPage() {
  let services: any[] = [];
  let dbError = false;

  try {
    await ensureServicesSeeded();
    services = await prisma.service.findMany({
      orderBy: { order: 'asc' },
    });
  } catch (error) {
    console.error('Failed to fetch services:', error);
    dbError = true;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#102B3F] mb-2">Services & Products</h1>
          <p className="text-[#607D94]">Kelola & atur urutan daftar layanan/produk K-Pop (Drag & Drop).</p>
        </div>
        <Link 
          href="/admin/services/new"
          className="flex items-center gap-2 bg-[#3BBBE2] text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-[#1A7B9B] shadow-md shadow-[#3BBBE2]/20 transition-all text-sm"
        >
          <PlusSquare className="w-4 h-4" />
          Tambah Service Baru
        </Link>
      </div>

      <AdminServiceList initialServices={services} />
    </div>
  );
}
