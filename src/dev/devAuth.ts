import axios from "axios";

export type DevTenant = { id: string; name: string };

type Tokens = {
  access: { token: string };
  refresh: { token: string };
};

type LoginResponse = {
  data: { tenants: DevTenant[]; preAuthToken: string } | Tokens;
};

type SelectTenantResponse = { data: Tokens };

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": import.meta.env.VITE_API_KEY,
  },
});

export const devAuth = {
  login: async (email: string, password: string) => {
    const { data } = await client.post<LoginResponse>("/auth/login", {
      email,
      password,
      rememberMe: false,
    });
    return data;
  },

  selectTenant: async (tenantId: string, preAuthToken: string) => {
    const { data } = await client.post<SelectTenantResponse>(
      "/auth/select-tenant",
      { tenantId, preAuthToken }
    );
    return data;
  },

  refresh: async (refreshToken: string) => {
    const { data } = await client.post<SelectTenantResponse>(
      "/auth/new-token",
      { refreshToken }
    );
    return data;
  },
};
