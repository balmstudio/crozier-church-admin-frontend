import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editBranchById } from "../api/branches.service";

export const useEditBranchById = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editBranchById,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["branches", "branch-by-id", variables.branchId, "details"],
      });
      queryClient.invalidateQueries({ queryKey: ["branches", "tenant"] });
    },
  });
};
