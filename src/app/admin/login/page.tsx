'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ShieldCheck, Mail, Lock, Loader2, ArrowRight } from 'lucide-react';
import { AuthService } from '@/lib/services/auth.service';
import { useAuthStore } from '@/store/auth-store';

export default function AdminLoginPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const initialized = useAuthStore((state) => state.initialized);
  const setUser = useAuthStore((state) => state.setUser);
  const initialize = useAuthStore((state) => state.initialize);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!initialized) {
      initialize();
    }
  }, [initialized, initialize]);

  useEffect(() => {
    if (initialized && user) {
      router.replace('/admin');
      return;
    }
  }, [initialized, user, router]);

  if (initialized && user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#1b1b1b]">
        <div className="text-sm text-gray-400">Redirecting...</div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Email and password are required.');
      return;
    }

    const signIn = async () => {
      try {
        setLoading(true);
        const user = await AuthService.signIn(email, password);
        if (!user?.email) {
          throw new Error('Unable to verify user.');
        }
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        });
        router.push('/admin');
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : 'Failed to sign in. Please check your credentials.';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    void signIn();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1b1b1b] px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md rounded-2xl border border-gray-800 bg-gray-900/80 p-8 shadow-2xl backdrop-blur-xl"
      >
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#43b14b]/40 bg-[#43b14b]/20">
            <ShieldCheck className="h-6 w-6 text-[#43b14b]" />
          </div>
          <div>
            <p className="text-sm uppercase tracking-wider text-gray-400">
              Admin Access
            </p>
            <h1 className="text-xl font-semibold text-white">
              NebulaX Admin Console
            </h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm text-gray-300">Work Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <input
                type="email"
                placeholder="admin@nebulax.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-gray-800 bg-gray-950 px-10 py-3 text-sm text-white placeholder-gray-500 focus:border-[#43b14b] focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-300">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-800 bg-gray-950 px-10 py-3 text-sm text-white placeholder-gray-500 focus:border-[#43b14b] focus:outline-none"
              />
            </div>
            <p className="text-xs text-gray-500">
              Use your admin credentials. Contact the platform owner if you need
              access.
            </p>
          </div>

          {error && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#43b14b] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#3a9a41] disabled:opacity-70"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <ArrowRight className="h-4 w-4" />
            )}
            {loading ? 'Signing in...' : 'Sign in securely'}
          </button>
        </form>

        <div className="mt-6 text-xs leading-relaxed text-gray-500">
          Protected admin area. Wire to Firebase Auth with custom claims /
          allowlist and restrict via middleware. Hide this URL from navigation.
        </div>
      </motion.div>
    </div>
  );
}
