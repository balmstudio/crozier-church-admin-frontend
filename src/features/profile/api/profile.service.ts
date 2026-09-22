import { userProfile } from "../data/profile.mock";
import type { UpdatePasswordDto, UpdateProfileDto } from "../dto/profile.dto";
import type { UserProfile } from "../types/profile.types";

let profile = { ...userProfile };

export const getProfile = async (): Promise<UserProfile> => profile;

export const updateProfile = async (updates: UpdateProfileDto): Promise<UserProfile> => {
  profile = { ...profile, ...updates };
  return profile;
};

export const updatePassword = async (passwords: UpdatePasswordDto): Promise<void> => {
  void passwords;
};
