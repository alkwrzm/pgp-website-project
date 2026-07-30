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
    try {
      await fetch('/api/login', { method: 'DELETE' });
    } catch (e) {
      console.error(e);
    }
    // Force clear client-side cookie as well
    document.cookie = 'admin_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.href = '/admin/login';
  };

  return (
    <div className="flex min-h-screen bg-[#F4F9FC] text-[#102B3F]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#102B3F] border-r border-[#607D94]/20 flex flex-col justify-between h-screen sticky top-0 shadow-xl z-40">
        <div>
          <div className="h-20 flex items-center px-6 border-b border-white/10">
            <Link href="/admin" className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-[#3BBBE2] text-[#102B3F] flex items-center justify-center font-extrabold text-sm shadow-md">
                PGP
              </span>
              <span>CMS Admin</span>
            </Link>
          </div>
          
          <nav className="py-6 px-4 space-y-6">
            <div>
              <p className="px-4 text-[10px] font-mono font-bold tracking-widest text-[#3BBBE2]/80 uppercase mb-2">
                Projects & Portfolio
              </p>
              <div className="space-y-1">
                <Link 
                  href="/admin" 
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    pathname === '/admin' 
                      ? 'bg-[#3BBBE2] text-white shadow-md shadow-[#3BBBE2]/20' 
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  All Projects
                </Link>
                <Link 
                  href="/admin/projects/new" 
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    pathname === '/admin/projects/new' 
                      ? 'bg-[#3BBBE2] text-white shadow-md shadow-[#3BBBE2]/20' 
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <PlusSquare className="w-4 h-4" />
                  New Project
                </Link>
              </div>
            </div>

            <div>
              <p className="px-4 text-[10px] font-mono font-bold tracking-widest text-[#3BBBE2]/80 uppercase mb-2">
                Services & Products
              </p>
              <div className="space-y-1">
                <Link 
                  href="/admin/services" 
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    pathname === '/admin/services' 
                      ? 'bg-[#3BBBE2] text-white shadow-md shadow-[#3BBBE2]/20' 
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  All Services
                </Link>
                <Link 
                  href="/admin/services/new" 
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    pathname === '/admin/services/new' 
                      ? 'bg-[#3BBBE2] text-white shadow-md shadow-[#3BBBE2]/20' 
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <FolderPlus className="w-4 h-4" />
                  New Service
                </Link>
              </div>
            </div>
          </nav>
        </div>

        <div className="p-4 border-t border-white/10 space-y-1.5 bg-[#0C2232]">
          <Link 
            href="/" 
            className="flex items-center gap-2.5 px-4 py-2 text-xs text-white/70 hover:text-[#3BBBE2] transition-colors font-medium"
          >
            ← Back to Public Website
          </Link>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-red-300 hover:text-white hover:bg-red-500/20 rounded-xl transition-all font-semibold text-left cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-red-400" />
            Logout / Keluar
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-auto bg-[#F4F9FC]">
        {/* Top Header Bar */}
        <header className="h-16 border-b border-[#607D94]/15 bg-white/80 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="text-xs font-mono text-[#607D94] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#3BBBE2] animate-pulse" />
            <span>PGP CMS Control Panel</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-red-500/20 bg-red-50 text-red-600 hover:bg-red-500 hover:text-white text-xs font-semibold transition-all shadow-xs cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout / Keluar</span>
          </button>
        </header>

        <main className="flex-1 p-6 md:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
