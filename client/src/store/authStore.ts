import { create } from 'zustand';

interface User {
    _id: string;
    name: string;
    email: string;
}

interface AuthState {
    user: User | null;
    login: (user: any) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    login: (user: User) => set({ user }),
    logout: () => set({ user: null }),
}));
