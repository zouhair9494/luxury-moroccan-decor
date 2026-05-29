import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isAdmin: boolean;
  orders: string[];
  address?: {
    street: string;
    city: string;
    country: string;
    zip: string;
  };
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

const DEMO_USERS: Record<string, { password: string; user: User }> = {
  'admin@maisonaura.com': {
    password: 'admin123',
    user: {
      id: 'admin-1',
      name: 'Admin User',
      email: 'admin@maisonaura.com',
      isAdmin: true,
      orders: [],
    },
  },
  'user@example.com': {
    password: 'user123',
    user: {
      id: 'user-1',
      name: 'Sarah Mitchell',
      email: 'user@example.com',
      isAdmin: false,
      orders: ['ord-001', 'ord-002'],
      address: {
        street: '123 Luxury Lane',
        city: 'Casablanca',
        country: 'Morocco',
        zip: '20000',
      },
    },
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (email, password) => {
        const demoUser = DEMO_USERS[email];
        if (demoUser && demoUser.password === password) {
          set({ user: demoUser.user, isAuthenticated: true });
          return true;
        }
        return false;
      },
      register: async (name, email, _password) => {
        if (DEMO_USERS[email]) return false;
        const newUser: User = {
          id: `user-${Date.now()}`,
          name,
          email,
          isAdmin: false,
          orders: [],
        };
        set({ user: newUser, isAuthenticated: true });
        return true;
      },
      logout: () => set({ user: null, isAuthenticated: false }),
      updateProfile: (data) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        })),
    }),
    { name: 'maison-aura-auth' }
  )
);
