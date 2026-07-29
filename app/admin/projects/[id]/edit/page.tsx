import ProjectForm from '@/components/ProjectForm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await prisma.project.findUnique({
    where: { id }
  });

  if (!project) notFound();

  // Convert Date to string for client component
  const plainProject = {
    ...project,
    eventDate: project.eventDate.toISOString(),
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <Link href="/admin" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8">
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>
      
      <div className="mb-8">
        <h1 className="text-3xl font-medium text-white mb-2">Edit Project</h1>
        <p className="text-white/60">Update details for {project.title}.</p>
      </div>

      <ProjectForm initialData={plainProject} />
    </div>
  );
}
