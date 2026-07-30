import ServiceForm from '@/components/ServiceForm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = await prisma.service.findUnique({
    where: { id }
  });

  if (!service) notFound();

  return (
    <div className="max-w-4xl mx-auto">
      <Link href="/admin/services" className="inline-flex items-center gap-2 text-[#607D94] hover:text-[#102B3F] transition-colors mb-8 text-sm font-semibold">
        <ArrowLeft className="w-4 h-4" />
        Kembali ke Daftar Service
      </Link>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#102B3F] mb-2">Edit Service</h1>
        <p className="text-[#607D94]">Update informasi atau kelola galeri foto untuk {service.title}.</p>
      </div>

      <ServiceForm initialData={service} />
    </div>
  );
}
