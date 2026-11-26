import api from "@/services/api";
import { SETTINGS_ENDPOINTS } from "./settings.api";
import type {
  SettingsUpdateTenantPayload,
  SettingsUpdateTenantResponse,
} from "../types/settings.types";

export const updateSettingsTenant = async (
  payload: SettingsUpdateTenantPayload,
): Promise<SettingsUpdateTenantResponse> => {
  const { data } = await api.patch<SettingsUpdateTenantResponse>(
    SETTINGS_ENDPOINTS.UPDATE_TENANT,
    payload,
  );

  return data;
};
