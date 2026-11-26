import { useBranchByIdDetails } from "@/features/branches/hooks/useBranchByIdDetails.hook";
import { useAuthStore } from "@/store/authStore";

export const useBranchSettings = () => {
  const branchId = useAuthStore((state) => state.user?.branchId);
  return useBranchByIdDetails(branchId);
};
