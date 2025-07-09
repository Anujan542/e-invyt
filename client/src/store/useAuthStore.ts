import { create } from 'zustand';

interface User {
  _id: string;
  email: string;
  name: string;
  isVerified: boolean;
}

interface AuthState {
  user: User | null;
  isAuthorized: boolean;
  isVerified: boolean;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthorized: false,
  isVerified: false,
  setUser: (user) =>
    set({
      user,
      isAuthorized: !!user,
      isVerified: !!user?.isVerified,
    }),
}));
