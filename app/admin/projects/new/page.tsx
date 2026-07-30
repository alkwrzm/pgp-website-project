import ProjectForm from '@/components/ProjectForm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NewProjectPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <Link href="/admin" className="inline-flex items-center gap-2 text-[#607D94] hover:text-[#102B3F] transition-colors mb-8 text-sm font-semibold">
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#102B3F] mb-2">New Project</h1>
        <p className="text-[#607D94]">Upload a new portfolio poster to the public gallery.</p>
      </div>

      <ProjectForm />
    </div>
  );
}
