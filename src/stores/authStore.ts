import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AdminState {
  isAuthenticated: boolean;
  adminId: string | null;
  login: (adminId: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AdminState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      adminId: null,
      login: async (adminId: string, password: string) => {
        // In production, this would be validated against a secure backend
        const validCredentials = [
          { id: 'Assassin@01', password: 'Assassin@01' }
        ];
        
        const isValid = validCredentials.some(
          cred => cred.id === adminId && cred.password === password
        );
        
        if (isValid) {
          set({ isAuthenticated: true, adminId });
          return true;
        }
        return false;
      },
      logout: () => set({ isAuthenticated: false, adminId: null }),
    }),
    {
      name: 'admin-auth',
    }
  )
);