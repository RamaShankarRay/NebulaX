import { create } from 'zustand';
import { User as FirebaseUser, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/config/firebase';
import type { User } from '@/types';

interface AuthState {
  user: User | null;
  loading: boolean;
  initialized: boolean;
  setUser: (user: (Partial<User> & { uid: string }) | null) => void;
  setLoading: (loading: boolean) => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  initialized: false,
  setUser: (user) =>
    set({
      user: user
        ? ({
            uid: user.uid,
            email: user.email ?? null,
            displayName: user.displayName ?? null,
            photoURL: user.photoURL ?? null,
          } as User)
        : null,
    }),
  setLoading: (loading) => set({ loading }),
  initialize: () => {
    if (typeof window === 'undefined') return;

    set({ loading: true, initialized: true });

    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser: FirebaseUser | null) => {
        if (firebaseUser) {
          set({
            user: {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName,
              photoURL: firebaseUser.photoURL,
            } as User,
            loading: false,
          });
        } else {
          set({ user: null, loading: false });
        }
      }
    );

    // Cleanup function would be called on unmount
    return unsubscribe;
  },
}));
