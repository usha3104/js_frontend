import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, Role } from "@/types";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  login: (user: User, token: string) => void;
  logout: () => void;
  hasRole: (role: Role) => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),

      login: (user, token) => {
        if (typeof window !== "undefined") {
          localStorage.setItem("userRole", user.role);
          localStorage.setItem("isAuthenticated", "true");
        }
        set({
          user,
          token,
          isAuthenticated: true,
        });
      },

      logout: () => {
        if (typeof window !== "undefined") {
          localStorage.removeItem("userRole");
          localStorage.removeItem("isAuthenticated");
        }
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      hasRole: (role) => get().user?.role === role,
    }),
    {
      name: "m2i-auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
