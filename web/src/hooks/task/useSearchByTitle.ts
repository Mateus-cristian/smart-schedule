import { useQuery } from "@tanstack/react-query";
import api from "@/api/axios";

export function useTasksByTitle(debouncedTitle: string) {
  return useQuery({
    queryKey: ["tasks", "search", debouncedTitle],
    queryFn: async () => {
      const { data } = await api.get("/tasks/search_by_title", {
        params: { title: debouncedTitle },
      });
      return data;
    },
    enabled: !!debouncedTitle,
  });
}
