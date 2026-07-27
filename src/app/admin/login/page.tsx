'use client';

import { useState } from 'react';
import { loginAdmin } from '@/app/admin/actions';
import { Lock, User } from 'lucide-react';

export default function LoginPage() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const res = await loginAdmin(formData);

    if (res && res.error) {
      setError(res.error);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-extrabold text-slate-900">Admin Login</h1>
          <p className="text-xs text-slate-500">Masuk untuk mengelola konten Purbayani Eco Tourism</p>
        </div>

        {error && (
          <div className="p-4 rounded-2xl bg-rose-50 text-rose-600 text-xs font-medium border border-rose-100 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Username</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
              <input
                type="text"
                name="username"
                required
                placeholder="Masukkan username"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
              <input
                type="password"
                name="password"
                required
                placeholder="Masukkan password"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md transition disabled:opacity-50 cursor-pointer mt-2"
          >
            {loading ? 'Memproses...' : 'Masuk ke Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
}