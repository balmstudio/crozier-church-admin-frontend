import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../api/profile.service";
import { currentUserQueryKey } from "@/hooks/useCurrentUser";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: currentUserQueryKey }),
  });
};
