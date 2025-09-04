import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "@/api/task";
import type { TaskData } from "@/schemas/task";

export function useCreateTask(onSuccess?: () => void) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: TaskData) => createTask(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      onSuccess?.();
    },
  });
}
