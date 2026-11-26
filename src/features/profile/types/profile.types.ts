import type { ApiResponse } from "@/features/dashboard/types/dashboard.types";

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImage: string | null;
  phoneNumber: string | null;
  secondaryPhoneNumber: string | null;
  gender: string | null;
  birthday: string | null;
  relationship: string | null;
  weddingAnniversary: string | null;
}

export interface CurrentUserProfileData {
  id: string;
  firstName: string;
  email: string;
  lastName: string;
  phoneNumber: string | null;
  secondaryPhoneNumber: string | null;
  profileImage: string | null;
  gender: string | null;
  visitorStatus: number | null;
  birthday: string | null;
  weddingAnniversary: string | null;
  assignedWorkerId: string | null;
  firstVisit: string | null;
  dateJoined: string | null;
  relationship: string | null;
  metadata: Record<string, unknown>;
  saved: boolean | null;
  membershipInterest: boolean | null;
  homeAddress: string | null;
  spiritBaptismStatus: boolean | null;
  serviceMode: string | null;
  occupation: string[];
  childrenCount: number;
  socialMediaHandles: Record<string, string> | null;
  referralChannel: string[];
  referrer: string | null;
  previousChurches: string[];
  followupConsent: boolean | null;
  preferredFollowupChannel: string[];
  preferredFollowupTime: string | null;
  dateSaved: string | null;
  firstTimeSalvation: boolean | null;
  rededication: boolean | null;
  rededicationDate: string | null;
  waterBaptismStatus: boolean | null;
  waterBaptismInterest: boolean | null;
  churchServiceInterest: boolean | null;
  interestedDepartments: string[];
  foundationClassEnrollment: boolean | null;
  newConvertStatus: number | null;
  designation: number;
  isMember: boolean;
  isNewConvert: boolean;
  isActive: boolean;
  isVirtualMember: boolean;
  defaultBranchId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProfileCurrentUserData {
  id: string;
  userId: string;
  tenantId: string;
  branchId: string;
  email: string;
  lastSeen: string | null;
  isAccountActivated: boolean;
  isAccountLocked: boolean;
  isInviteAccepted: boolean;
  isAccountDeleted: boolean;
  isTenantSuperAdmin: boolean;
  isTenantAdmin: boolean;
  isBranchSuperAdmin: boolean;
  isBranchAdmin: boolean;
  isLoggedIn: boolean;
  unitId: string | null;
  roleId: string | null;
  role: string;
  status: string;
  completedTaskCount: number;
  createdAt: string;
  updatedAt: string;
  user: CurrentUserProfileData;
}

export type ProfileCurrentUserResponse = ApiResponse<{
  message: string;
  data: ProfileCurrentUserData;
}>;

export interface PreferredFollowupTime {
  day: string;
  time: string;
}

export interface UpdateWorkerProfileRequest {
  firstName?: string;
  lastName?: string;
  profileImage?: string;
  gender?: string;
  phoneNumber?: string;
  secondaryPhoneNumber?: string | null;
  relationship?: string;
  birthday?: string;
  weddingAnniversary?: string | null;
  homeAddress?: string;
  firstVisit?: string;
  dateJoined?: string;
  designation?: number;
  isMember?: boolean;
  isNewConvert?: boolean;
  membershipInterest?: boolean;
  serviceMode?: string;
  saved?: boolean;
  dateSaved?: string;
  firstTimeSalvation?: boolean;
  rededication?: boolean;
  rededicationDate?: string | null;
  spiritBaptismStatus?: boolean;
  waterBaptismStatus?: boolean;
  waterBaptismInterest?: boolean;
  followupConsent?: boolean;
  preferredFollowupChannel?: string[];
  preferredFollowupTime?: PreferredFollowupTime;
  churchServiceInterest?: boolean;
  interestedDepartments?: string[];
  foundationClassEnrollment?: boolean;
  newConvertStatus?: number;
  occupation?: string[];
  childrenCount?: number;
  referralChannel?: string[];
  referrer?: string;
  previousChurches?: string[];
  socialMediaHandles?: Record<string, string>;
  prayerRequest?: string;
  serviceFeedback?: string;
  counsellingRequest?: string;
  metadata?: Record<string, unknown>;
}

export type UpdateWorkerProfileData = { id: string } & Partial<UpdateWorkerProfileRequest>;

export type UpdateWorkerProfileResponse = ApiResponse<{
  message: string;
  data: UpdateWorkerProfileData;
}>;

export interface ChangeWorkerPasswordRequest {
  password: string;
  newPassword: string;
}

export interface ChangeWorkerPasswordData {
  id: string;
}

export type ChangeWorkerPasswordResponse = ApiResponse<{
  message: string;
  data: ChangeWorkerPasswordData;
}>;
