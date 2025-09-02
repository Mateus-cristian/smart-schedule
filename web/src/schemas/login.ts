import { z } from "zod";

export const loginAccountSchema = z.object({
  email: z
    .email("Deve ser um email válido")
    .nonempty("Email deve ser preenchido"),
  password: z.string().nonempty("Password deve ser preenchido"),
});

export type LoginAccountInput = z.infer<typeof loginAccountSchema>;
