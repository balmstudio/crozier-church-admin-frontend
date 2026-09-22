import { useMutation } from "@tanstack/react-query";
import { updatePassword } from "../api/profile.service";

export const useUpdatePassword = () =>
  useMutation({
    mutationFn: updatePassword,
  });
