import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSettingsTenant } from "../api/settings.service";

export const useUpdateSettingsTenant = (branchId: string | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSettingsTenant,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["branches", "branch-by-id", branchId, "details"],
      }),
  });
};
