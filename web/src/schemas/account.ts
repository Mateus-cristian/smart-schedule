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

const forgotPasswordSchema = z.object({
  email: z.string().email("Deve ser um email válido"),
});

type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;

const resetPasswordSchema = z
  .object({
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "As senhas não coincidem",
    path: ["passwordConfirmation"],
  });

type ResetPasswordData = z.infer<typeof resetPasswordSchema>;

const createAccountSchema = z
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
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type CreateAccountData = z.infer<typeof createAccountSchema>;

export { createAccountSchema, forgotPasswordSchema, resetPasswordSchema };

export type { CreateAccountData, ForgotPasswordData, ResetPasswordData };
