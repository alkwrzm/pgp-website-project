import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';
import { Pencil, PlusSquare, Images } from 'lucide-react';
import { ensureServicesSeeded } from '@/lib/seedServices';
import DeleteButton from '@/components/DeleteButton';

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
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-medium text-white mb-2">Services & Products</h1>
          <p className="text-white/60">Kelola daftar layanan, aplikasi (PocketDrop), kiosk (PIC2GO), dan produk K-Pop.</p>
        </div>
        <Link 
          href="/admin/services/new"
          className="flex items-center gap-2 bg-white text-black px-4 py-2.5 rounded-xl font-medium hover:bg-white/90 transition-colors text-sm"
        >
          <PlusSquare className="w-4 h-4" />
          Tambah Service Baru
        </Link>
      </div>

      <div className="bg-black border border-white/10 rounded-xl overflow-hidden shadow-xl">
        <table className="w-full text-left text-sm text-white/70">
          <thead className="bg-white/[0.02] text-white/50 text-xs uppercase border-b border-white/10">
            <tr>
              <th className="px-6 py-4 font-medium">Service / Product</th>
              <th className="px-6 py-4 font-medium">Kategori</th>
              <th className="px-6 py-4 font-medium">Jumlah Foto</th>
              <th className="px-6 py-4 font-medium text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {services.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-white/40">
                  {dbError ? 'Gagal memuat data dari database.' : 'Belum ada service yang dibuat.'}
                </td>
              </tr>
            ) : (
              services.map((service) => (
                <tr key={service.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white/10 flex items-center justify-center flex-shrink-0">
                        {service.images && service.images.length > 0 ? (
                          <Image src={service.images[0]} alt={service.title} fill sizes="48px" className="object-cover" />
                        ) : (
                          <Images className="w-5 h-5 text-white/40" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{service.title}</h4>
                        {service.subtitle && (
                          <p className="text-xs text-white/50 font-light truncate max-w-xs">{service.subtitle}</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-white/10 rounded-full text-xs text-white/80 border border-white/5">
                      {service.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-mono text-white/60">
                      {service.images?.length || 0} Foto/UI
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link 
                        href={`/admin/services/${service.id}/edit`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 text-white hover:bg-white/20 rounded-lg transition-colors text-xs font-medium"
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
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
