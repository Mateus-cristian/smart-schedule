import { create } from "zustand";
import api from "@/api/axios";

type User = { id: number; email: string };

interface AuthState {
  user: User | null | undefined;
  fetchCurrentUser: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: undefined,

  fetchCurrentUser: async () => {
    set({ user: undefined });
    try {
      const { data } = await api.get("/current_user");
      set({ user: data?.user ?? null });
    } catch (err) {
      set({ user: null });
      throw err;
    }
  },

  login: async (email, password) => {
    const { data } = await api.post("/users/sign_in", {
      user: { email, password },
    });
    set({ user: data.user });
  },

  logout: async () => {
    await api.delete("/users/sign_out");
    set({ user: null });
  },

  clearUser: () => set({ user: null }),
}));
