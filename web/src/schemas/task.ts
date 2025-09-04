import { z } from "zod";

export const taskSchema = z.object({
  id: z.number().optional(),
  title: z.string().nonempty("Nome da tarefa deve ser preenchido"),
  description: z.string().nonempty("Descrição deve ser preenchida"),
  dueDate: z.string().nonempty("Data de entrega deve ser preenchida"),
  active: z.boolean(),
});

export type TaskData = z.infer<typeof taskSchema>;
