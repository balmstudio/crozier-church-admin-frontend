import type { UserProfile } from "../types/profile.types";

export type UpdateProfileDto = Partial<UserProfile>;

export interface UpdatePasswordDto {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
