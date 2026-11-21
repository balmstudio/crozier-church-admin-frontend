import { API_ENDPOINTS } from "@/constants/api";
import type {
  InviteWorkerPayload,
  InviteWorkerResponse,
} from "../types/api";
import api from "./api";

export const authService = {
  logout: async () => {
    const { data } = await api.post(API_ENDPOINTS.AUTH.LOGOUT);
    return data;
  },

  inviteWorker: async (payload: InviteWorkerPayload) => {
    const { data } = await api.post<InviteWorkerResponse>(API_ENDPOINTS.AUTH.INVITE, payload);
    return data;
  },
};
