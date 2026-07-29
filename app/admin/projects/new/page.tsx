import ProjectForm from '@/components/ProjectForm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NewProjectPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <Link href="/admin" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8">
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>
      
      <div className="mb-8">
        <h1 className="text-3xl font-medium text-white mb-2">New Project</h1>
        <p className="text-white/60">Upload a new portfolio poster to the public gallery.</p>
      </div>

      <ProjectForm />
    </div>
  );
}
