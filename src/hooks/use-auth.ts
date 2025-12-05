import { useEffect } from 'react';
import { useAuthStore } from '@/store/auth-store';

export function useAuth() {
  const { user, loading, initialized, initialize } = useAuthStore();

  useEffect(() => {
    if (!initialized) {
      initialize();
    }
  }, [initialized, initialize]);

  return {
    user,
    loading,
    isAuthenticated: !!user,
  };
}
