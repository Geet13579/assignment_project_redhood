import { create } from 'zustand'; // Named import
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthState {
    user: { 
        email: string; 
        token: string; 
        login_id: string; 
        rememberMe: boolean; 
    } | null;
    loading: boolean; // Added loading state
    login: (email: string, token: string, login_id: string, rememberMe: boolean) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            loading: false, // Initialize loading state
            login: (email: string, token: string, login_id: string, rememberMe: boolean) => 
                set({ user: { email, token, login_id, rememberMe } }),
            logout: () => {
                set({ loading: true }); // Set loading state to true
                setTimeout(() => {
                    set({ user: null, loading: false }); // Clear user data after 1 second
                }, 1000);
            },
        }),
        {
            name: 'auth-storage', 
            storage: createJSONStorage(() => localStorage),
        }
    )
);
