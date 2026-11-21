import type { ApiResponse } from "@/features/dashboard/types/dashboard.types";

export type AtLeastOne<T, Keys extends keyof T = keyof T> =
  Keys extends keyof T ? Required<Pick<T, Keys>> & Partial<Omit<T, Keys>> : never;

export interface SettingsUpdateTenantFields {
  name: string;
  logo: string;
  organizationEmail: string;
  organizationPhoneNumber: string;
  abbreviatedName: string;
}

export type SettingsUpdateTenantPayload = AtLeastOne<SettingsUpdateTenantFields>;

export interface SettingsUpdatedTenant {
  id: string;
  name: string;
  logo: string | null;
  organizationEmail: string;
  organizationPhoneNumber: string;
  abbreviatedName: string;
  createdAt: string;
  updatedAt: string;
}

export type SettingsUpdateTenantResponse = ApiResponse<SettingsUpdatedTenant>;
