import { useCurrentUser } from "@/hooks/useCurrentUser";

export const useProfile = () => {
  const query = useCurrentUser();

  return {
    ...query,
    data: query.data?.data.user,
  };
};
