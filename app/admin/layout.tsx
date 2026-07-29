'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, LogOut, PlusSquare, Layers, FolderPlus } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  // Do not render sidebar on login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await fetch('/api/login', { method: 'DELETE' });
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <div className="flex min-h-screen bg-zinc-950">
      {/* Sidebar */}
      <aside className="w-64 bg-black border-r border-white/10 flex flex-col">
        <div className="h-20 flex items-center px-6 border-b border-white/10">
          <Link href="/admin" className="text-xl font-bold tracking-tighter text-white">
            PGP CMS Admin
          </Link>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-6">
          <div>
            <p className="px-4 text-[10px] font-bold tracking-widest text-white/40 uppercase mb-2">Projects</p>
            <div className="space-y-1">
              <Link 
                href="/admin" 
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors ${
                  pathname === '/admin' ? 'bg-white/10 text-white font-medium' : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                All Projects
              </Link>
              <Link 
                href="/admin/projects/new" 
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors ${
                  pathname === '/admin/projects/new' ? 'bg-white/10 text-white font-medium' : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <PlusSquare className="w-4 h-4" />
                New Project
              </Link>
            </div>
          </div>

          <div>
            <p className="px-4 text-[10px] font-bold tracking-widest text-white/40 uppercase mb-2">Services & Products</p>
            <div className="space-y-1">
              <Link 
                href="/admin/services" 
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors ${
                  pathname === '/admin/services' ? 'bg-white/10 text-white font-medium' : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <Layers className="w-4 h-4" />
                All Services
              </Link>
              <Link 
                href="/admin/services/new" 
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors ${
                  pathname === '/admin/services/new' ? 'bg-white/10 text-white font-medium' : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <FolderPlus className="w-4 h-4" />
                New Service
              </Link>
            </div>
          </div>
        </nav>
        
        <div className="p-4 border-t border-white/10 space-y-1">
          <Link 
            href="/" 
            className="flex items-center gap-3 px-4 py-2.5 text-xs text-white/50 hover:text-white transition-colors"
          >
            ← Back to Public Website
          </Link>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-red-400 hover:bg-red-500/10 rounded-lg transition-colors text-left"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
