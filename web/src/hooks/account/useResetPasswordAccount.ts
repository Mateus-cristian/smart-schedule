import { useMutation } from "@tanstack/react-query";
import { resetPasswordAccount } from "@/api/account";
import type { ResetPasswordData } from "@/schemas/account";

export function useResetPasswordAccount(onSuccess?: () => void) {
  return useMutation({
    mutationFn: (data: ResetPasswordData & { token: string }) =>
      resetPasswordAccount(data),
    onSuccess,
  });
}
