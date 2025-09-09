import { useMutation } from "@tanstack/react-query";
import { forgotPasswordAccount } from "@/api/account";
import type { ForgotPasswordData } from "@/schemas/account";

export function useForgotPasswordAccount(onSuccess?: () => void) {
  return useMutation({
    mutationFn: (payload: ForgotPasswordData) => forgotPasswordAccount(payload),
    onSuccess,
  });
}
