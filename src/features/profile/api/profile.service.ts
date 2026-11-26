import type {
  ChangeWorkerPasswordRequest,
  ChangeWorkerPasswordResponse,
  ProfileCurrentUserResponse,
  UpdateWorkerProfileRequest,
  UpdateWorkerProfileResponse,
} from "../types/profile.types";
import api from "@/services/api";
import { PROFILE_ENDPOINTS } from "./profile.api";

export const getProfileCurrentUser = async (): Promise<ProfileCurrentUserResponse> => {
  const { data } = await api.get<ProfileCurrentUserResponse>(PROFILE_ENDPOINTS.CURRENT_USER);
  return data;
};

export const updateProfile = async (
  body: UpdateWorkerProfileRequest,
): Promise<UpdateWorkerProfileResponse> => {
  const { data } = await api.post<UpdateWorkerProfileResponse>(PROFILE_ENDPOINTS.UPDATE, body);
  return data;
};

export const updatePassword = async (
  body: ChangeWorkerPasswordRequest,
): Promise<ChangeWorkerPasswordResponse> => {
  const { data } = await api.put<ChangeWorkerPasswordResponse>(
    PROFILE_ENDPOINTS.CHANGE_PASSWORD,
    body,
  );
  return data;
};
