import type { ProfileCurrentUserData } from "@/features/profile/types/profile.types";
import type { TenantOption } from "@/types/api";
import { create } from "zustand";

type AuthState = {
  user: ProfileCurrentUserData | null;
  tenant: TenantOption | null;
  setSession: (user: ProfileCurrentUserData, tenant?: TenantOption | null) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  tenant: null,

  setSession: (user, tenant = null) => set({ user, tenant }),

  clearAuth: () => set({ user: null, tenant: null }),
}));
