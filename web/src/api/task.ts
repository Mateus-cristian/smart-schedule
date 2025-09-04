import api from "./axios";
import type { TaskData } from "@/schemas/task";

export async function fetchTasks() {
  const { data } = await api.get("/tasks");
  return data;
}

export async function createTask(payload: TaskData) {
  return api.post("/tasks", payload);
}

export async function updateTask(id: number, payload: Partial<TaskData>) {
  return api.put(`/tasks/${id}`, payload);
}

export async function deleteTask(id: number) {
  return api.delete(`/tasks/${id}`);
}
