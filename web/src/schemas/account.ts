import { z } from "zod";

export const passwordRequirements = [
  {
    regex: /[a-z]/,
    message: "Deve conter pelo menos uma letra minúscula",
  },
  {
    regex: /[A-Z]/,
    message: "Deve conter pelo menos uma letra maiúscula",
  },
  {
    regex: /[^a-zA-Z0-9]/,
    message: "Deve conter pelo menos um caractere especial",
  },
];

export const createAccountSchema = z
  .object({
    username: z.string().nonempty("Nome deve ser preenchido"),
    email: z.string().email("Deve ser um email válido"),
    password: z
      .string()
      .min(8, "Senha deve ter no mínimo 8 caracteres")
      .refine((val) => passwordRequirements.every((r) => r.regex.test(val)), {
        message:
          "A senha deve conter pelo menos uma letra minúscula, uma maiúscula e um caractere especial",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type CreateAccountInput = z.infer<typeof createAccountSchema>;
