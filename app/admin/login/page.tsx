'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Lock, ArrowRight, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push('/admin');
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || 'Password salah. Silakan coba lagi.');
      }
    } catch (err) {
      setError('Terjadi kesalahan. Coba lagi nanti.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F9FC] flex flex-col justify-center items-center px-4 relative overflow-hidden text-[#102B3F]">
      {/* Soft Ambient Glow */}
      <div className="absolute w-[600px] h-[600px] bg-[#3BBBE2]/10 rounded-full blur-3xl pointer-events-none -top-48 -left-48" />

      <div className="w-full max-w-md bg-white border border-[#607D94]/20 rounded-3xl p-8 shadow-2xl shadow-[#1A7B9B]/10 relative z-10">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-[#3BBBE2]/10 border border-[#3BBBE2]/20 flex items-center justify-center mb-4 text-[#1A7B9B]">
            <Lock className="w-7 h-7 text-[#3BBBE2]" />
          </div>
          <h1 className="text-2xl font-bold text-[#102B3F] tracking-tight">PGP CMS Portal</h1>
          <p className="text-sm text-[#607D94] mt-1">Masukkan password admin untuk melanjutkan</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-red-600 text-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#102B3F] mb-2">
              Password Admin
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#F4F9FC] border border-[#607D94]/25 rounded-xl px-4 py-3 text-[#102B3F] placeholder-[#607D94]/50 focus:outline-none focus:border-[#3BBBE2] focus:ring-1 focus:ring-[#3BBBE2] transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#3BBBE2] text-white font-semibold py-3.5 rounded-xl hover:bg-[#1A7B9B] shadow-md shadow-[#3BBBE2]/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'Memverifikasi...' : 'Masuk Dashboard'}
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        <div className="mt-8 text-center text-xs text-[#607D94]">
          Password bawaan: <code className="bg-[#F4F9FC] border border-[#607D94]/20 px-2 py-1 rounded text-[#102B3F] font-mono">admin</code>
        </div>
      </div>
    </div>
  );
}
