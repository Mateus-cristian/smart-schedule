import { useMutation } from "@tanstack/react-query";
import { createAccount } from "@/api/account";
import type { CreateAccountData } from "@/schemas/account";

export function useCreateAccount(onSuccess?: () => void) {
  return useMutation({
    mutationFn: (payload: CreateAccountData) => createAccount(payload),
    onSuccess,
  });
}
