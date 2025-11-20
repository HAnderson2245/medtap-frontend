import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Profile } from '../types';

interface AuthState {
  token: string | null;
  user: (User & { profile?: Profile }) | null;
  setAuth: (token: string, user: User & { profile?: Profile }) => void;
  clearAuth: () => void;
  updateUser: (user: Partial<User>) => void;
  updateProfile: (profile: Partial<Profile>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setAuth: (token, user) => set({ token, user }),
      clearAuth: () => set({ token: null, user: null }),
      updateUser: (userData) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        })),
      updateProfile: (profileData) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                profile: state.user.profile
                  ? { ...state.user.profile, ...profileData }
                  : profileData as Profile,
              }
            : null,
        })),
    }),
    {
      name: 'medtap-auth',
    }
  )
);

interface AppState {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  sidebarOpen: true,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
}));
