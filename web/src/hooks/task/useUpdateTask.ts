import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "@/api/task";

export function useUpdateTask(onSuccess?: () => void) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...payload }: { id: number; [key: string]: any }) =>
      updateTask(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      onSuccess?.();
    },
  });
}
