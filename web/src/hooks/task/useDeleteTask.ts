import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "@/api/task";

export function useDeleteTask(onSuccess?: () => void) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      onSuccess?.();
    },
  });
}
