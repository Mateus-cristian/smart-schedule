import { useQuery } from "@tanstack/react-query";
import api from "@/api/axios";

export function useTasksPaginated(page = 1, perPage = 10) {
  return useQuery({
    queryKey: ["tasks", page, perPage],
    queryFn: async () => {
      const { data } = await api.get("/tasks", {
        params: { page, per_page: perPage },
      });
      return data;
    },
    placeholderData: (prev) => prev,
  });
}

export function useTasksByTitlePaginated(
  title: string,
  active: boolean,
  page: number,
  perPage?: number
) {
  return useQuery({
    queryKey: ["tasks", "search", title, active, (page = 1), (perPage = 10)],
    queryFn: async () => {
      const { data } = await api.get("/tasks/search_by_title", {
        params: { title, active, page, per_page: perPage },
      });
      return data;
    },
    placeholderData: (prev) => prev,
  });
}
