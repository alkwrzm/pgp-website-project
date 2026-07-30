import ServiceForm from '@/components/ServiceForm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NewServicePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <Link href="/admin/services" className="inline-flex items-center gap-2 text-[#607D94] hover:text-[#102B3F] transition-colors mb-8 text-sm font-semibold">
        <ArrowLeft className="w-4 h-4" />
        Kembali ke Daftar Service
      </Link>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#102B3F] mb-2">Tambah Service Baru</h1>
        <p className="text-[#607D94]">Buat item service/produk baru lengkap dengan galeri foto/screenshot UI.</p>
      </div>

      <ServiceForm />
    </div>
  );
}
