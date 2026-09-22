import { useQuery } from "@tanstack/react-query";
import { getRoleWorkers } from "../api/adminUsers.service";
import { adminUserKeys } from "./adminUserKeys";

export const useRoleWorkers = () =>
  useQuery({
    queryKey: adminUserKeys.roleWorkers(),
    queryFn: getRoleWorkers,
  });
