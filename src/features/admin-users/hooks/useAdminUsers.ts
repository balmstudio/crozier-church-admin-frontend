import { useQuery } from "@tanstack/react-query";
import { getAdminUsers } from "../api/adminUsers.service";
import { adminUserKeys } from "./adminUserKeys";

export const useAdminUsers = () =>
  useQuery({
    queryKey: adminUserKeys.lists(),
    queryFn: getAdminUsers,
  });
