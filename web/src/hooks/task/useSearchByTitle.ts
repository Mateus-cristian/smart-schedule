import { useQuery } from "@tanstack/react-query";
import api from "@/api/axios";

export function useTasksByTitle(debouncedTitle: string, active: boolean) {
  return useQuery({
    queryKey: ["tasks", "search", debouncedTitle, active],
    queryFn: async () => {
      const { data } = await api.get("/tasks/search_by_title", {
        params: { title: debouncedTitle, active },
      });
      return data;
    },
    enabled: true,
  });
}
