import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editBranchByIdWorker } from "../api/branches.service";

export const useEditBranchByIdWorker = (branchId: string | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editBranchByIdWorker,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["branches", "branch-by-id", branchId, "workers"],
      });
      queryClient.invalidateQueries({
        queryKey: ["branches", "branch-by-id", branchId, "analytics", "units-overview"],
      });
      queryClient.invalidateQueries({
        queryKey: ["branches", "branch-by-id", branchId, "analytics", "unit-workers"],
      });
    },
  });
};
