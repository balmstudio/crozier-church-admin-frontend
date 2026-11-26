import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBranch } from "../api/branches.service";

export const useCreateBranch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBranch,
    onSuccess: (response) => {
      if (!response.error) {
        queryClient.invalidateQueries({ queryKey: ["branches", "tenant"] });
      }
    },
  });
};
