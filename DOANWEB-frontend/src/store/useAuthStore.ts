import { create } from 'zustand';
import api from '../api/axios';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  loading: boolean;
  login: (userData: User) => void;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,

  checkAuth: async () => {
    set({ loading: true });
    try {
      const response = await api.get('/auth.php?action=me');
      if (response.data.success) {
        set({ user: response.data.data });
      } else {
        localStorage.removeItem('access_token');
        set({ user: null });
      }
    } catch (err) {
      localStorage.removeItem('access_token');
      set({ user: null });
    } finally {
      set({ loading: false });
    }
  },

  login: (userData: User) => {
    set({ user: userData });
  },

  logout: async () => {
    try {
      await api.post('/auth.php?action=logout');
    } catch (err) {
      console.error('Failed to logout on server');
    } finally {
      localStorage.removeItem('access_token');
      set({ user: null });
    }
  },
}));
