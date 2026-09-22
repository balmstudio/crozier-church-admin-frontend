import { useQuery } from "@tanstack/react-query";
import { getAdminRoles } from "../api/adminUsers.service";
import { adminUserKeys } from "./adminUserKeys";

export const useAdminRoles = () =>
  useQuery({
    queryKey: adminUserKeys.roles(),
    queryFn: getAdminRoles,
  });
