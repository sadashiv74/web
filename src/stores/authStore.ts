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
          { id: 'admin_mu_eng_2024', password: 'MU_Papers_Secure@2024' },
          { id: 'super_admin_mu', password: 'SuperAdmin_MU@2024' }
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