import { useQuery } from "@tanstack/react-query";
import { getProfileCurrentUser } from "@/features/profile/api/profile.service";

export const currentUserQueryKey = ["profile", "current-user"] as const;

export const useCurrentUser = () => {
  return useQuery({
    queryKey: currentUserQueryKey,
    queryFn: getProfileCurrentUser,
    retry: false,
    refetchOnWindowFocus: false,
  });
};
