import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../api/profile.service";
import { profileKeys } from "./profileKeys";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (profile) => {
      queryClient.setQueryData(profileKeys.detail(), profile);
    },
  });
};
