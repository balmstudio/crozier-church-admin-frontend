import { useQuery } from "@tanstack/react-query";
import { getBranchSettings } from "../api/settings.service";
import { settingsKeys } from "./settingsKeys";

export const useBranchSettings = () =>
  useQuery({
    queryKey: settingsKeys.branch(),
    queryFn: getBranchSettings,
  });
