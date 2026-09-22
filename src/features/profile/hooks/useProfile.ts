import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../api/profile.service";
import { profileKeys } from "./profileKeys";

export const useProfile = () =>
  useQuery({
    queryKey: profileKeys.detail(),
    queryFn: getProfile,
  });
