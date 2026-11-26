import axios from "axios";
import { toast } from "sonner";
import { useAuthStore } from "../store/authStore";
import { devAuth } from "../dev/devAuth";
import { getDevAccessToken, getDevRefreshToken, setDevTokens } from "../dev/devToken";
import { API_ENDPOINTS } from "@/constants/api";
import { redirectToLogin } from "@/constants/auth";

const config = {
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: !import.meta.env.DEV,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": import.meta.env.VITE_API_KEY,
  },
};

const api = axios.create(config);

const refreshClient = axios.create(config);

interface ApiNotificationPayload {
  success?: boolean;
  error?: boolean;
  message?: string;
}

const getToastId = (method?: string, url?: string) =>
  `api:${method?.toLowerCase() ?? "request"}:${url ?? "unknown"}`;

const getApiMessage = (data: unknown, fallback: string) => {
  if (
    typeof data === "object" &&
    data !== null &&
    "message" in data &&
    typeof data.message === "string" &&
    data.message.trim()
  ) {
    return data.message;
  }

  return fallback;
};

const notifySuccess = (response: { data: unknown; config: { method?: string; url?: string } }) => {
  const payload = response.data as ApiNotificationPayload | null;
  const message = getApiMessage(response.data, "Request completed successfully.");
  const options = { id: getToastId(response.config.method, response.config.url) };

  if (payload?.success === false || payload?.error === true) {
    toast.error(message, options);
    return;
  }

  toast.success(message, options);
};

const notifyError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    toast.error(
      getApiMessage(error.response?.data, error.message || "Request failed. Please try again."),
      { id: getToastId(error.config?.method, error.config?.url) },
    );
    return;
  }

  toast.error(error instanceof Error ? error.message : "Request failed. Please try again.");
};

if (import.meta.env.DEV) {
  api.interceptors.request.use((req) => {
    const token = getDevAccessToken();
    if (token) req.headers.Authorization = `Bearer ${token}`;
    return req;
  });
}

let refreshPromise: Promise<void> | null = null;

const devRefresh = async () => {
  const refreshToken = getDevRefreshToken();
  if (!refreshToken) throw new Error("No dev refresh token");
  const { data } = await devAuth.refresh(refreshToken);
  setDevTokens(data.access.token, data.refresh.token);
};

const refreshSession = () => {
  refreshPromise ??= (
    import.meta.env.DEV ? devRefresh() : refreshClient.post(API_ENDPOINTS.AUTH.NEW_TOKEN)
  )
    .then(() => undefined)
    .finally(() => {
      refreshPromise = null;
    });
  return refreshPromise;
};

api.interceptors.response.use(
  (response) => {
    notifySuccess(response);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status !== 401 || originalRequest?._retry) {
      notifyError(error);
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      await refreshSession();
      return api(originalRequest);
    } catch {
      notifyError(error);
      useAuthStore.getState().clearAuth();
      redirectToLogin();
      return Promise.reject(error);
    }
  },
);

export default api;
