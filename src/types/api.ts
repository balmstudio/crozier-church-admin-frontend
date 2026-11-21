export type TenantOption = {
  id: string;
  name: string;
  logo: string | null;
};

export type InviteWorkerPayload = {
  email: string;
  role: "Worker" | "Member" | "Admin";
  unitId: string;
};

export type InviteWorkerResponse = {
  success: boolean;
  status: number;
  message: string;
  data: {
    id: string;
    status: string;
    email: string;
    role: string;
    unitId: string;
    dateSent: string;
    branchId: string;
    updatedAt: string;
    createdAt: string;
  };
  timestamp: string;
};
